"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var blessed = require("blessed");
var contrib = require("blessed-contrib");
var main_1 = require("./screen/main");
var file_system_1 = require("./screen/file-system");
var process_1 = require("./screen/process");
var SMTerminal = /** @class */ (function () {
    function SMTerminal() {
        this.screen = blessed.screen();
        this.grid = new contrib.grid({ rows: 12, cols: 12, screen: this.screen });
        this.keyOfBindings = {
            f2: "main",
            f3: "file",
            f4: "proc"
        };
        this.screen.key(["escape", "q", "C-c"], function (ch, key) {
            return process.exit(0);
        });
        process.on("unhandledRejection", console.dir);
        this.keyBindings();
    }
    SMTerminal.prototype.start = function (screen) {
        if (screen === "proc") {
            new process_1.ProcessScreen(this.grid, contrib, this.screen).start();
        }
        else if (screen === "file") {
            new file_system_1.FileSystemScreen(this.grid, contrib, this.screen).start();
        }
        else {
            new main_1.MainScreen(this.grid, contrib, this.screen).start();
        }
    };
    SMTerminal.prototype.keyBindings = function () {
        var _this = this;
        this.screen.key(["f2", "f3", "f4"], function (ch, key) {
            _this.start(_this.keyOfBindings[key.name]);
        });
    };
    return SMTerminal;
}());
exports.SMTerminal = SMTerminal;
