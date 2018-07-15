import { CpuModule } from "../modules/cpu";
import { MemoryModule } from "../modules/memory";
import { NetworkModule } from "../modules/network";
import { DiskModule } from "../modules/disk";

export class MainScreen {
    grid: any;
    contrib: any;
    screen: any;

    constructor(grid: any, contrib: any, screen: any) {
        this.grid = grid;
        this.contrib = contrib;
        this.screen = screen;
    }

    start(): void {
        // cpu
        const cpu: any = this.grid.set(0, 0, 4, 8, this.contrib.line, {
            label: " CPU History ",
            showLegend: true,
            showNthLabel: 5,
            maxY: 100,
            legend: {
                width: 18
            }
        });

        const cpuList: any = this.grid.set(0, 8, 4, 4, this.contrib.table, {
            keys: true,
            label: " CPU Usage (F6 - Table Focus) ",
            vi: true,
            columnWidth: [15, 15]
        });

        // memory
        const memorySwapLine: any = this.grid.set(4, 0, 4, 8, this.contrib.line, {
            label: " Memory & Swap History ",
            showLegend: true,
            showNthLabel: 5,
            maxY: 100,
            legend: {
                width: 20
            }
        });

        const memorySwapDonut: any = this.grid.set(4, 8, 4, 4, this.contrib.donut, {
            radius: 8,
            arcWidth: 3,
            remainColor: "black",
            label: " Memory & Swap Usage "
        });

        // network
        const networkLine: any = this.grid.set(8, 0, 4, 8, this.contrib.line, {
            label: " Network History (KB/s) ",
            showLegend: true,
            legend: {
                width: 50
            },
            showNthLabel: 50
        });

        // disk
        const diskList: any = this.grid.set(8, 8, 4, 4, this.contrib.table, {
            keys: true,
            vi: true,
            label: " Disk Usage (F7 - Table Focus) ",
            columnWidth: [10, 10, 16]
        });

        new CpuModule(this.screen).start(cpu, cpuList);
        new MemoryModule(this.screen).start(memorySwapLine, memorySwapDonut);
        new NetworkModule(this.screen).start(networkLine);
        new DiskModule(this.screen).start(diskList);

        cpuList.focus();
        this.screen.key(["f6", "f7"], (ch: any, key: any) => {
            if (key.name === "f6") {
                cpuList.focus();
            } else if (key.name === "f7") {
                diskList.focus();
            }
        });

        this.screen.on("resize", (data: any) => {
            cpu.emit("attach");
            memorySwapLine.emit("attach");
            networkLine.emit("attach");
            memorySwapDonut.emit("attach");
            cpuList.emit("attach");
            diskList.emit("attach");
        });
    }
}