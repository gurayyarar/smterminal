import * as si from "systeminformation";
import { IDisk } from "../interfaces/disk";
import { Platform, Utils } from "../utils";

export class DiskDal {
    platform: Platform;

    constructor() {
        this.platform = new Utils().getPlatform();
    }

    async getCapacityInfosAsync(): Promise<IDisk[]> {
        return await si.fsSize().then((data: any) => {
            let disks: IDisk[] = [];

            if (this.platform === Platform.Windows) {
                data.forEach((disk: any, index: number) => {
                    if (disk.type !== undefined) {
                        disks.push({
                            all_capacity: parseInt(disk.size, null),
                            used_capacity: disk.used,
                            used_percent: disk.use,
                            disc_name: disk.fs.replace(":", "")
                        });
                    }
                });
            } else if (this.platform === Platform.MacOs) {
                data.forEach((disk: any, index: number) => {
                    const mountSplit: string[] = disk.mount.indexOf("/") > -1 ? disk.mount.split("/") : [];
                    let discName: string = mountSplit.length !== 0 ? mountSplit[mountSplit.length - 1] : "";
                    if (discName === "") {
                        discName = "*Primary";
                    }

                    disks.push({
                        all_capacity: disk.size,
                        used_capacity: disk.used,
                        used_percent: disk.use,
                        disc_name: discName
                    });
                });
            }
            else {
                data.forEach((disk: any, index: number) => {
                    if (disk.fs.indexOf("/sd") > -1) {
                        const mountSplit: string[] = disk.mount.indexOf("/") > -1 ? disk.mount.split("/") : [];
                        let discName: string = mountSplit.length !== 0 ? mountSplit[mountSplit.length - 1] : "";
                        if (discName === "") {
                            discName = "*Primary";
                        }

                        disks.push({
                            all_capacity: disk.size,
                            used_capacity: disk.used,
                            used_percent: disk.use,
                            disc_name: discName
                        });
                    }
                });
            }
            return disks;
        });
    }
}