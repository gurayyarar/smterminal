import * as fKill from "fkill";
import { Utils } from "../utils";
import { ProcessDal } from "../dal/process";
import { IProcess } from "../interfaces/process";

export class ProcessModule {
    screen: any;
    utils: Utils;
    processDal: ProcessDal;
    keyOfColumns: any;
    sortBy: any;
    isDesc: boolean;

    constructor(screen: any) {
        this.screen = screen;
        this.utils = new Utils();
        this.processDal = new ProcessDal();

        this.keyOfColumns = {
            p: "process_id",
            c: "cpu_usage_percent",
            m: "memory_usage_percent",
            u: "user",
            r: "priority",
            o: "command"
        };

        this.sortBy = this.keyOfColumns.c;
        this.isDesc = true;
    }

    start(processList: any): void {
        processList.screen.key(["p", "c", "m", "u", "r", "o"], (ch: any, key: any) => {
            if (this.sortBy === this.keyOfColumns[ch]) {
                this.isDesc = !this.isDesc;
            }
            this.sortBy = this.keyOfColumns[ch];

            this.loadData(processList, () => {
                processList.rows.select(0);
            });
        });

        processList.rows.on("select", (item: any, idx: any) => {
            // tslint:disable-next-line:radix
            var pid: number = parseInt(item.parent.value.substr(0, item.parent.value.indexOf(" ")));
            fKill(pid).then(() => {
                // tslint:disable-next-line:no-empty
                this.loadData(processList, () => {});
            });
        });

        // tslint:disable-next-line:no-empty
        this.loadData(processList, () => {});
        setInterval(() => {
            // tslint:disable-next-line:no-empty
            this.loadData(processList, () => {});
        }, 2500);
    }

    private loadData(processList: any, callback: any): void {
        let processListDatas: any[] = [];
        const headers: string[] = ["PID(p)", "COMMAND(o)", "CPU%(c)", "MEM%(m)", "USER(u)", "PRIORITY(r)"];
        headers[{
            process_id: 0,
            command: 1,
            cpu_usage_percent: 2,
            memory_usage_percent: 3,
            user: 4,
            priority: 5
        }[this.sortBy]] += this.isDesc ? "▼" : "▲";

        this.processDal.getAllActiveProcessesAsync().then((data: IProcess[]) => {
            data = data.sort((a: any, b: any) => {
                if (this.sortBy === "command" || this.sortBy === "user") {
                    return !this.isDesc ? a[this.sortBy].localeCompare(b[this.sortBy]) : b[this.sortBy].localeCompare(a[this.sortBy]);
                }

                return !this.isDesc ? a[this.sortBy] - b[this.sortBy] : b[this.sortBy] - a[this.sortBy];
            });

            data.forEach((process: IProcess, index: number) => {
                let dummyArray: any[] = [];
                dummyArray.push(process.process_id);
                dummyArray.push(process.command);
                dummyArray.push(process.cpu_usage_percent);
                dummyArray.push(process.memory_usage_percent);
                dummyArray.push(process.user);
                dummyArray.push(process.priority);

                processListDatas.push(dummyArray);
            });

            processList.setData({
                headers: headers,
                data: processListDatas
            });
            callback();
            this.screen.render();
        });
    }
}