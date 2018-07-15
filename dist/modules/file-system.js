"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
var file_system_1 = require("../dal/file-system");
var FileSystemModule = /** @class */ (function () {
    function FileSystemModule(screen) {
        this.screen = screen;
        this.utils = new utils_1.Utils();
        this.fileSystemDal = new file_system_1.FileSystemDal();
        this.keyOfColumns = {
            d: "disc_name",
            t: "type",
            s: "all_capacity",
            a: "available_capacity",
            u: "used_percent"
        };
        this.sortBy = this.keyOfColumns.d;
        this.isDesc = false;
    }
    FileSystemModule.prototype.start = function (fileSystemList) {
        var _this = this;
        fileSystemList.screen.key(["d", "t", "s", "a", "u"], function (ch, key) {
            if (_this.sortBy === _this.keyOfColumns[ch]) {
                _this.isDesc = !_this.isDesc;
            }
            _this.sortBy = _this.keyOfColumns[ch];
            _this.loadData(fileSystemList, function () {
                fileSystemList.rows.select(0);
            });
        });
        // tslint:disable-next-line:no-empty
        this.loadData(fileSystemList, function () { });
        setInterval(function () {
            // tslint:disable-next-line:no-empty
            _this.loadData(fileSystemList, function () { });
        }, 10000);
    };
    FileSystemModule.prototype.loadData = function (fileSystemList, callback) {
        var _this = this;
        var fileSystemListDatas = [];
        var headers = ["DEVICE(d)", "TYPE(t)", "SIZE(s)", "AVAILABLE(a)", "USED%(u)"];
        headers[{
            disc_name: 0,
            type: 1,
            all_capacity: 2,
            available_capacity: 3,
            used_percent: 4
        }[this.sortBy]] += this.isDesc ? "▼" : "▲";
        this.fileSystemDal.getFileSystemSizesAsync().then(function (data) {
            data = data.sort(function (a, b) {
                if (_this.sortBy === "disc_name" || _this.sortBy === "type") {
                    return !_this.isDesc ? a[_this.sortBy].localeCompare(b[_this.sortBy]) : b[_this.sortBy].localeCompare(a[_this.sortBy]);
                }
                return !_this.isDesc ? a[_this.sortBy] - b[_this.sortBy] : b[_this.sortBy] - a[_this.sortBy];
            });
            data.forEach(function (disk, index) {
                var dummyArray = [];
                var sizeStr = _this.utils.getAsUnit(disk.all_capacity.toString());
                while (sizeStr.length < 10) {
                    sizeStr = " " + sizeStr;
                }
                var availableStr = _this.utils.getAsUnit(disk.available_capacity.toString()).replace("0.00 KB", "-");
                while (availableStr.length < 10) {
                    availableStr = " " + availableStr;
                }
                var usedpercentStr = disk.used_percent.toString();
                while (usedpercentStr.length < 6) {
                    usedpercentStr = " " + usedpercentStr;
                }
                dummyArray.push(disk.disc_name);
                dummyArray.push(disk.type);
                dummyArray.push(sizeStr);
                dummyArray.push(availableStr);
                dummyArray.push(usedpercentStr);
                fileSystemListDatas.push(dummyArray);
            });
            fileSystemList.setData({
                headers: headers,
                data: fileSystemListDatas
            });
            callback();
            _this.screen.render();
        });
    };
    return FileSystemModule;
}());
exports.FileSystemModule = FileSystemModule;
