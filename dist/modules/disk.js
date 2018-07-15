"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
var disk_1 = require("../dal/disk");
var DiskModule = /** @class */ (function () {
    function DiskModule(screen) {
        this.screen = screen;
        this.diskDal = new disk_1.DiskDal();
        this.utils = new utils_1.Utils();
    }
    DiskModule.prototype.start = function (diskList) {
        var _this = this;
        this.loadData(diskList);
        setInterval(function () {
            _this.loadData(diskList);
        }, 5000);
    };
    DiskModule.prototype.loadData = function (diskList) {
        var _this = this;
        var diskListDatas = [];
        var headers = ["Disk", "Total", "Used"];
        this.diskDal.getCapacityInfosAsync().then(function (data) {
            data.forEach(function (disk, index) {
                var dummyArray = [];
                dummyArray.push(disk.disc_name);
                dummyArray.push(_this.utils.getAsUnit(disk.all_capacity.toString()));
                dummyArray.push(_this.utils.getAsUnit(disk.used_capacity.toString()) + "(" + disk.used_percent.toFixed() + "%)");
                diskListDatas.push(dummyArray);
            });
            diskList.setData({
                headers: headers,
                data: diskListDatas
            });
            _this.screen.render();
        });
    };
    return DiskModule;
}());
exports.DiskModule = DiskModule;
