import { FileSystemModule } from "../modules/file-system";

export class FileSystemScreen {
    grid: any;
    contrib: any;
    screen: any;

    constructor(grid: any, contrib: any, screen: any) {
        this.grid = grid;
        this.contrib = contrib;
        this.screen = screen;
    }

    start(): void {
        const fileSystemList: any = this.grid.set(0, 0, 12, 12, this.contrib.table, {
            keys: true,
            label: " File Systems ",
            vi: true,
            columnSpacing: 1,
            columnWidth: [40, 15, 15, 15, 20]
        });

        new FileSystemModule(this.screen).start(fileSystemList);
        fileSystemList.focus();

        this.screen.on("resize", (data: any) => {
            fileSystemList.emit("attach");
        });
    }
}