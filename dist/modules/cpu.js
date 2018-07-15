"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cpu_1 = require("../dal/cpu");
var utils_1 = require("../utils");
var CpuModule = /** @class */ (function () {
    function CpuModule(screen) {
        this.cpuLoadData = [];
        this.screen = screen;
        this.cpuDal = new cpu_1.CpuDal();
        this.utils = new utils_1.Utils();
    }
    CpuModule.prototype.start = function (cpu, cpuList) {
        var _this = this;
        var colors = this.utils.getColors();
        this.cpuDal.getCoreLoadDatasAsync().then(function (data) {
            data.forEach(function (val, index) {
                _this.cpuLoadData.push({
                    title: " CPU " + (index + 1),
                    style: {
                        line: colors[index % colors.length]
                    },
                    x: new Array(61).fill(0).map(function (_, j) { return 60 - j; }),
                    y: new Array(61).fill(0)
                });
            });
            cpu.setData(_this.cpuLoadData);
            _this.screen.render();
            _this.loadData(cpu, cpuList);
            setInterval(function () {
                _this.loadData(cpu, cpuList);
            }, 1000);
        });
    };
    CpuModule.prototype.loadData = function (cpu, cpuList) {
        var _this = this;
        this.cpuDal.getCoreLoadDatasAsync().then(function (data) {
            var cpuListDatas = [];
            var headers = ["CPU#", "Usage%"];
            data.forEach(function (val, index) {
                var loadStr = _this.utils.loadString(val.toFixed(1), 7) + "%";
                var dummyArray = [];
                _this.cpuLoadData[index].title = " CPU" + (index + 1) + loadStr;
                _this.cpuLoadData[index].y.shift();
                _this.cpuLoadData[index].y.push(val);
                dummyArray.push("CPU" + (index + 1));
                dummyArray.push(loadStr);
                cpuListDatas.push(dummyArray);
            });
            cpuList.setData({
                headers: headers,
                data: cpuListDatas
            });
            cpu.setData(_this.cpuLoadData);
            _this.screen.render();
        });
    };
    return CpuModule;
}());
exports.CpuModule = CpuModule;
