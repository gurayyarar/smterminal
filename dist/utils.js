"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.prototype.getColors = function (index) {
        var colors = ["magenta", "cyan", "blue", "yellow", "green", "red"];
        return index === undefined || index === null ? colors : colors[index];
    };
    Utils.prototype.firstCharUpper = function (text) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    };
    Utils.prototype.loadString = function (val, length) {
        while (val.length < length) {
            val = " " + val;
        }
        return val;
    };
    Utils.prototype.getAsUnit = function (byteAsString) {
        var byte = parseInt(byteAsString, null);
        if (byte === 0) {
            return "0.00 KB";
        }
        else if (byte > 1099511627776) {
            return (byte / 1099511627776).toFixed(2) + " TB";
        }
        else if (byte > 1073741824) {
            return (byte / 1073741824).toFixed(2) + " GB";
        }
        else if (byte > 1048576) {
            return (byte / 1048576).toFixed(2) + " MB";
        }
        else if (byte > 1024) {
            return (byte / 1024).toFixed(2) + " KB";
        }
        return byte.toFixed(2) + " B";
    };
    Utils.prototype.getPlatform = function () {
        var platform = process.platform;
        if (platform === "win32") {
            return Platform.Windows;
        }
        else if (platform === "darwin") {
            return Platform.MacOs;
        }
        else {
            return Platform.Linux;
        }
    };
    return Utils;
}());
exports.Utils = Utils;
var Platform;
(function (Platform) {
    Platform[Platform["Windows"] = 0] = "Windows";
    Platform[Platform["MacOs"] = 1] = "MacOs";
    Platform[Platform["Linux"] = 2] = "Linux";
})(Platform = exports.Platform || (exports.Platform = {}));
