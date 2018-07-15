"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
var network_1 = require("../dal/network");
var NetworkModule = /** @class */ (function () {
    function NetworkModule(screen) {
        this.networkData = [];
        this.screen = screen;
        this.utils = new utils_1.Utils();
        this.networkDal = new network_1.NetworkDal();
        this.colors = this.utils.getColors();
    }
    NetworkModule.prototype.start = function (networkLine) {
        var _this = this;
        this.networkData.push({
            title: " Download ",
            style: {
                line: this.colors[0]
            },
            x: new Array(61).fill(0).map(function (_, j) { return 60 - j; }),
            y: new Array(61).fill(0)
        });
        this.networkData.push({
            title: " Upload ",
            style: {
                line: this.colors[1]
            },
            x: new Array(61).fill(0).map(function (_, j) { return 60 - j; }),
            y: new Array(61).fill(0)
        });
        networkLine.setData(this.networkData);
        this.screen.render();
        setInterval(function () {
            _this.loadData(networkLine);
        }, 1000);
    };
    NetworkModule.prototype.loadData = function (networkLine) {
        var _this = this;
        this.networkDal.getDataTransferInfosAsync().then(function (data) {
            var downloadStr = _this.utils.getAsUnit(data.received_per_second.toString()) + "/s";
            while (downloadStr.length < 12) {
                downloadStr = " " + downloadStr;
            }
            downloadStr = downloadStr + " - ";
            var uploadStr = _this.utils.getAsUnit(data.transferred_per_second.toString()) + "/s";
            while (uploadStr.length < 12) {
                uploadStr = " " + uploadStr;
            }
            uploadStr = uploadStr + " - ";
            _this.networkData[0].title = " Download" + downloadStr + _this.utils.getAsUnit(data.received_all.toString());
            _this.networkData[0].y.shift();
            _this.networkData[0].y.push(data.received_per_second / 1024);
            _this.networkData[1].title = " Upload  " + uploadStr + _this.utils.getAsUnit(data.transferred_all.toString());
            _this.networkData[1].y.shift();
            _this.networkData[1].y.push(data.transferred_per_second / 1024);
            networkLine.setData(_this.networkData);
            _this.screen.render();
        });
    };
    return NetworkModule;
}());
exports.NetworkModule = NetworkModule;
