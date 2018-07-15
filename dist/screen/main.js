"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cpu_1 = require("../modules/cpu");
var memory_1 = require("../modules/memory");
var network_1 = require("../modules/network");
var disk_1 = require("../modules/disk");
var MainScreen = /** @class */ (function () {
    function MainScreen(grid, contrib, screen) {
        this.grid = grid;
        this.contrib = contrib;
        this.screen = screen;
    }
    MainScreen.prototype.start = function () {
        // cpu
        var cpu = this.grid.set(0, 0, 4, 8, this.contrib.line, {
            label: " CPU History ",
            showLegend: true,
            showNthLabel: 5,
            maxY: 100,
            legend: {
                width: 18
            }
        });
        var cpuList = this.grid.set(0, 8, 4, 4, this.contrib.table, {
            keys: true,
            label: " CPU Usage (F6 - Table Focus) ",
            vi: true,
            columnWidth: [15, 15]
        });
        // memory
        var memorySwapLine = this.grid.set(4, 0, 4, 8, this.contrib.line, {
            label: " Memory & Swap History ",
            showLegend: true,
            showNthLabel: 5,
            maxY: 100,
            legend: {
                width: 20
            }
        });
        var memorySwapDonut = this.grid.set(4, 8, 4, 4, this.contrib.donut, {
            radius: 8,
            arcWidth: 3,
            remainColor: "black",
            label: " Memory & Swap Usage "
        });
        // network
        var networkLine = this.grid.set(8, 0, 4, 8, this.contrib.line, {
            label: " Network History (KB/s) ",
            showLegend: true,
            legend: {
                width: 50
            },
            showNthLabel: 50
        });
        // disk
        var diskList = this.grid.set(8, 8, 4, 4, this.contrib.table, {
            keys: true,
            vi: true,
            label: " Disk Usage (F7 - Table Focus) ",
            columnWidth: [10, 10, 16]
        });
        new cpu_1.CpuModule(this.screen).start(cpu, cpuList);
        new memory_1.MemoryModule(this.screen).start(memorySwapLine, memorySwapDonut);
        new network_1.NetworkModule(this.screen).start(networkLine);
        new disk_1.DiskModule(this.screen).start(diskList);
        cpuList.focus();
        this.screen.key(["f6", "f7"], function (ch, key) {
            if (key.name === "f6") {
                cpuList.focus();
            }
            else if (key.name === "f7") {
                diskList.focus();
            }
        });
        this.screen.on("resize", function (data) {
            cpu.emit("attach");
            memorySwapLine.emit("attach");
            networkLine.emit("attach");
            memorySwapDonut.emit("attach");
            cpuList.emit("attach");
            diskList.emit("attach");
        });
    };
    return MainScreen;
}());
exports.MainScreen = MainScreen;
