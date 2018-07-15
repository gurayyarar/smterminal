"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fKill = require("fkill");
var utils_1 = require("../utils");
var process_1 = require("../dal/process");
var ProcessModule = /** @class */ (function () {
    function ProcessModule(screen) {
        this.screen = screen;
        this.utils = new utils_1.Utils();
        this.processDal = new process_1.ProcessDal();
        this.keyOfColumns = {
            p: "process_id",
            c: "cpu_usage_percent",
            m: "memory_usage_percent",
            u: "user",
            r: "priority",
            o: "command"
        };
        this.sortBy = this.keyOfColumns.c;
        this.isDesc = true;
    }
    ProcessModule.prototype.start = function (processList) {
        var _this = this;
        processList.screen.key(["p", "c", "m", "u", "r", "o"], function (ch, key) {
            if (_this.sortBy === _this.keyOfColumns[ch]) {
                _this.isDesc = !_this.isDesc;
            }
            _this.sortBy = _this.keyOfColumns[ch];
            _this.loadData(processList, function () {
                processList.rows.select(0);
            });
        });
        processList.rows.on("select", function (item, idx) {
            // tslint:disable-next-line:radix
            var pid = parseInt(item.parent.value.substr(0, item.parent.value.indexOf(" ")));
            fKill(pid).then(function () {
                // tslint:disable-next-line:no-empty
                _this.loadData(processList, function () { });
            });
        });
        // tslint:disable-next-line:no-empty
        this.loadData(processList, function () { });
        setInterval(function () {
            // tslint:disable-next-line:no-empty
            _this.loadData(processList, function () { });
        }, 2500);
    };
    ProcessModule.prototype.loadData = function (processList, callback) {
        var _this = this;
        var processListDatas = [];
        var headers = ["PID(p)", "COMMAND(o)", "CPU%(c)", "MEM%(m)", "USER(u)", "PRIORITY(r)"];
        headers[{
            process_id: 0,
            command: 1,
            cpu_usage_percent: 2,
            memory_usage_percent: 3,
            user: 4,
            priority: 5
        }[this.sortBy]] += this.isDesc ? "▼" : "▲";
        this.processDal.getAllActiveProcessesAsync().then(function (data) {
            data = data.sort(function (a, b) {
                if (_this.sortBy === "command" || _this.sortBy === "user") {
                    return !_this.isDesc ? a[_this.sortBy].localeCompare(b[_this.sortBy]) : b[_this.sortBy].localeCompare(a[_this.sortBy]);
                }
                return !_this.isDesc ? a[_this.sortBy] - b[_this.sortBy] : b[_this.sortBy] - a[_this.sortBy];
            });
            data.forEach(function (process, index) {
                var dummyArray = [];
                dummyArray.push(process.process_id);
                dummyArray.push(process.command);
                dummyArray.push(process.cpu_usage_percent);
                dummyArray.push(process.memory_usage_percent);
                dummyArray.push(process.user);
                dummyArray.push(process.priority);
                processListDatas.push(dummyArray);
            });
            processList.setData({
                headers: headers,
                data: processListDatas
            });
            callback();
            _this.screen.render();
        });
    };
    return ProcessModule;
}());
exports.ProcessModule = ProcessModule;
