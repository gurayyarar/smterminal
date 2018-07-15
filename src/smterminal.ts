import * as blessed from "blessed";
import * as contrib from "blessed-contrib";
import { MainScreen } from "./screen/main";
import { FileSystemScreen } from "./screen/file-system";
import { ProcessScreen } from "./screen/process";

export class SMTerminal {
    screen: any;
    grid: any;
    keyOfBindings: any;

    constructor() {
        this.screen = blessed.screen();
        this.grid = new contrib.grid({ rows: 12, cols: 12, screen: this.screen });
        this.keyOfBindings = {
            f2: "main",
            f3: "file",
            f4: "proc"
        };

        this.screen.key(["escape", "q", "C-c"], (ch: any, key: any) => {
            return process.exit(0);
        });

        process.on("unhandledRejection", console.dir);
        this.keyBindings();
    }

    start(screen: string): void {
        if (screen === "proc") {
            new ProcessScreen(this.grid, contrib, this.screen).start();
        } else if (screen === "file") {
            new FileSystemScreen(this.grid, contrib, this.screen).start();
        } else {
            new MainScreen(this.grid, contrib, this.screen).start();
        }
    }

    keyBindings(): void {
        this.screen.key(["f2", "f3", "f4"], (ch: any, key: any) => {
            this.start(this.keyOfBindings[key.name]);
        });
    }
}