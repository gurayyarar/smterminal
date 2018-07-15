export class Utils {
    getColors(index?: number): any {
        var colors: string[] = ["magenta", "cyan", "blue", "yellow", "green", "red"];
        return index === undefined || index === null ? colors : colors[index];
    }

    firstCharUpper(text: string): string {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    loadString(val: string, length: number): string {
        while (val.length < length) {
            val = ` ${val}`;
        }

        return val;
    }

    getAsUnit(byteAsString: string): string {
        let byte: number = parseInt(byteAsString, null);

        if (byte === 0) {
            return "0.00 KB";
        } else if (byte > 1099511627776) {
            return (byte / 1099511627776).toFixed(2) + " TB";
        } else if (byte > 1073741824) {
            return (byte / 1073741824).toFixed(2) + " GB";
        } else if (byte > 1048576) {
            return (byte / 1048576).toFixed(2) + " MB";
        } else if (byte > 1024) {
            return (byte / 1024).toFixed(2) + " KB";
        }

        return byte.toFixed(2) + " B";
    }

    getPlatform(): Platform {
        const platform: string = process.platform;

        if (platform === "win32") {
            return Platform.Windows;
        } else if (platform === "darwin") {
            return Platform.MacOs;
        } else {
            return Platform.Linux;
        }
    }
}

export enum Platform {
    Windows,
    MacOs,
    Linux
}