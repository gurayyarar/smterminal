"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
var memory_1 = require("../dal/memory");
var MemoryModule = /** @class */ (function () {
    function MemoryModule(screen) {
        this.screen = screen;
        this.utils = new utils_1.Utils();
        this.memoryDal = new memory_1.MemoryDal();
        this.memoryLoadData = [];
        this.colors = this.utils.getColors();
    }
    MemoryModule.prototype.start = function (memorySwapLine, memorySwapDonut) {
        var _this = this;
        this.memoryLoadData.push({
            title: " Memory",
            style: {
                line: this.colors[0]
            },
            x: new Array(61).fill(0).map(function (_, j) { return 60 - j; }),
            y: new Array(61).fill(0)
        });
        this.memoryLoadData.push({
            title: " Swap",
            style: {
                line: this.colors[1]
            },
            x: new Array(61).fill(0).map(function (_, j) { return 60 - j; }),
            y: new Array(61).fill(0)
        });
        memorySwapLine.setData(this.memoryLoadData);
        this.screen.render();
        setInterval(function () {
            _this.loadData(memorySwapLine, memorySwapDonut);
        }, 1000);
    };
    MemoryModule.prototype.loadData = function (memorySwapLine, memorySwapDonut) {
        var _this = this;
        this.memoryDal.getMemoryCapacityInfosAsync().then(function (data) {
            var memoryStr = _this.utils.loadString(data.percent.toFixed(1), 7) + "%";
            var swapStr = _this.utils.loadString(data.swap_percent.toFixed(1), 9) + "%";
            _this.memoryLoadData[0].title = " Memory" + memoryStr;
            _this.memoryLoadData[0].y.shift();
            _this.memoryLoadData[0].y.push(data.percent);
            _this.memoryLoadData[1].title = " Swap" + swapStr;
            _this.memoryLoadData[1].y.shift();
            _this.memoryLoadData[1].y.push(data.swap_percent);
            memorySwapLine.setData(_this.memoryLoadData);
            var memoryDonutText = _this.utils.getAsUnit(data.used) + " of " + _this.utils.getAsUnit(data.total);
            var swapDonutText = _this.utils.getAsUnit(data.swap_used) + " of " + _this.utils.getAsUnit(data.swap_total);
            memorySwapDonut.setData([
                {
                    label: memoryDonutText,
                    color: _this.colors[0],
                    percent: parseInt(data.percent.toFixed(), null)
                },
                {
                    label: swapDonutText,
                    color: _this.colors[1],
                    percent: parseInt(data.swap_percent.toFixed(), null)
                }
            ]);
            _this.screen.render();
        });
    };
    return MemoryModule;
}());
exports.MemoryModule = MemoryModule;
