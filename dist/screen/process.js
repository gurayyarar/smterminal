"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var process_1 = require("../modules/process");
var ProcessScreen = /** @class */ (function () {
    function ProcessScreen(grid, contrib, screen) {
        this.grid = grid;
        this.contrib = contrib;
        this.screen = screen;
    }
    ProcessScreen.prototype.start = function () {
        var processList = this.grid.set(0, 0, 12, 12, this.contrib.table, {
            keys: true,
            vi: true,
            label: " Processes (Type ENTER kill the process which you want) ",
            columnSpacing: 1,
            columnWidth: [12, 40, 12, 12, 15, 15]
        });
        new process_1.ProcessModule(this.screen).start(processList);
        processList.focus();
        this.screen.on("resize", function (data) {
            processList.emit("attach");
        });
    };
    return ProcessScreen;
}());
exports.ProcessScreen = ProcessScreen;
