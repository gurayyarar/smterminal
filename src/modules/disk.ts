import { Utils } from "../utils";
import { DiskDal } from "../dal/disk";
import { IDisk } from "../interfaces/disk";

export class DiskModule {
    screen: any;
    utils: Utils;
    diskDal: DiskDal;

    constructor(screen: any) {
        this.screen = screen;
        this.diskDal = new DiskDal();
        this.utils = new Utils();
    }

    start(diskList: any): void {
        this.loadData(diskList);
        setInterval(() => {
            this.loadData(diskList);
        }, 5000);
    }

    private loadData(diskList: any): void {
        let diskListDatas: any[] = [];
        const headers: string[] = ["Disk", "Total", "Used"];

        this.diskDal.getCapacityInfosAsync().then((data: IDisk[]) => {
            data.forEach((disk: IDisk, index: number) => {
                let dummyArray: any[] = [];
                dummyArray.push(disk.disc_name);
                dummyArray.push(this.utils.getAsUnit(disk.all_capacity.toString()));
                dummyArray.push(`${this.utils.getAsUnit(disk.used_capacity.toString())}(${disk.used_percent.toFixed()}%)`);

                diskListDatas.push(dummyArray);
            });

            diskList.setData({
                headers: headers,
                data: diskListDatas
            });
            this.screen.render();
        });
    }
}