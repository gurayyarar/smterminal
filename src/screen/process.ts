import { ProcessModule } from "../modules/process";

export class ProcessScreen {
    grid: any;
    contrib: any;
    screen: any;

    constructor(grid: any, contrib: any, screen: any) {
        this.grid = grid;
        this.contrib = contrib;
        this.screen = screen;
    }

    start(): void {
        const processList: any = this.grid.set(0, 0, 12, 12, this.contrib.table, {
            keys: true,
            vi: true,
            label: " Processes (Type ENTER kill the process which you want) ",
            columnSpacing: 1,
            columnWidth: [12, 40, 12, 12, 15, 15]
        });

        new ProcessModule(this.screen).start(processList);
        processList.focus();

        this.screen.on("resize", (data: any) => {
            processList.emit("attach");
        });
    }
}