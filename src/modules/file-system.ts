import { Utils } from "../utils";
import { FileSystemDal } from "../dal/file-system";
import { IFileSystem } from "../interfaces/file-system";

export class FileSystemModule {
    screen: any;
    utils: Utils;
    fileSystemDal: FileSystemDal;
    keyOfColumns: any;
    sortBy: any;
    isDesc: boolean;

    constructor(screen: any) {
        this.screen = screen;
        this.utils = new Utils();
        this.fileSystemDal = new FileSystemDal();
        this.keyOfColumns = {
            d: "disc_name",
            t: "type",
            s: "all_capacity",
            a: "available_capacity",
            u: "used_percent"
        };
        this.sortBy = this.keyOfColumns.d;
        this.isDesc = false;
    }

    start(fileSystemList: any): void {
        fileSystemList.screen.key(["d", "t", "s", "a", "u"], (ch: any, key: any) => {
            if (this.sortBy === this.keyOfColumns[ch]) {
                this.isDesc = !this.isDesc;
            }

            this.sortBy = this.keyOfColumns[ch];
            this.loadData(fileSystemList, () => {
                fileSystemList.rows.select(0);
            });
        });

        // tslint:disable-next-line:no-empty
        this.loadData(fileSystemList, () => {});
        setInterval(() => {
            // tslint:disable-next-line:no-empty
            this.loadData(fileSystemList, () => {});
        }, 10000);
    }

    private loadData(fileSystemList: any, callback: any): void {
        let fileSystemListDatas: any[] = [];
        const headers: string[] = ["DEVICE(d)", "TYPE(t)", "SIZE(s)", "AVAILABLE(a)", "USED%(u)"];
        headers[{
            disc_name: 0,
            type: 1,
            all_capacity: 2,
            available_capacity: 3,
            used_percent: 4
        }[this.sortBy]] += this.isDesc ? "▼" : "▲";

        this.fileSystemDal.getFileSystemSizesAsync().then((data: IFileSystem[]) => {
            data = data.sort((a: any, b: any) => {
                if (this.sortBy === "disc_name" || this.sortBy === "type") {
                    return !this.isDesc ? a[this.sortBy].localeCompare(b[this.sortBy]) : b[this.sortBy].localeCompare(a[this.sortBy]);
                }

                return !this.isDesc ? a[this.sortBy] - b[this.sortBy] : b[this.sortBy] - a[this.sortBy];
            });

            data.forEach((disk: IFileSystem, index: number) => {
                let dummyArray: any[] = [];
                let sizeStr: string = this.utils.getAsUnit(disk.all_capacity.toString());
                while (sizeStr.length < 10) { sizeStr = ` ${sizeStr}`; }

                let availableStr: string = this.utils.getAsUnit(disk.available_capacity.toString()).replace("0.00 KB", "-");
                while (availableStr.length < 10) { availableStr = ` ${availableStr}`; }

                let usedpercentStr: string = disk.used_percent.toString();
                while (usedpercentStr.length < 6) { usedpercentStr = ` ${usedpercentStr}`; }

                dummyArray.push(disk.disc_name);
                dummyArray.push(disk.type);
                dummyArray.push(sizeStr);
                dummyArray.push(availableStr);
                dummyArray.push(usedpercentStr);

                fileSystemListDatas.push(dummyArray);
            });

            fileSystemList.setData({
                headers: headers,
                data: fileSystemListDatas
            });
            callback();
            this.screen.render();
        });
    }
}