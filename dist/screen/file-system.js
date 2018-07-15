"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var file_system_1 = require("../modules/file-system");
var FileSystemScreen = /** @class */ (function () {
    function FileSystemScreen(grid, contrib, screen) {
        this.grid = grid;
        this.contrib = contrib;
        this.screen = screen;
    }
    FileSystemScreen.prototype.start = function () {
        var fileSystemList = this.grid.set(0, 0, 12, 12, this.contrib.table, {
            keys: true,
            label: " File Systems ",
            vi: true,
            columnSpacing: 1,
            columnWidth: [40, 15, 15, 15, 20]
        });
        new file_system_1.FileSystemModule(this.screen).start(fileSystemList);
        fileSystemList.focus();
        this.screen.on("resize", function (data) {
            fileSystemList.emit("attach");
        });
    };
    return FileSystemScreen;
}());
exports.FileSystemScreen = FileSystemScreen;
