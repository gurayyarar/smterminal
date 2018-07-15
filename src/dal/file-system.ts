import * as si from "systeminformation";
import { IFileSystem } from "../interfaces/file-system";

export class FileSystemDal {
    async getFileSystemSizesAsync(): Promise<IFileSystem[]> {
        return await si.fsSize().then((data: any) => {
            let fileSystems: IFileSystem[] = [];

            data.forEach((disk: any, index: number) => {
                // if (disk.type !== undefined) {
                    
                // }
                fileSystems.push({
                    disc_name: disk.mount,
                    all_capacity: parseInt(disk.size, null),
                    used_capacity: parseInt(disk.used, null),
                    available_capacity: parseInt(disk.size, null) - parseInt(disk.used, null),
                    used_percent: disk.use.toFixed(2),
                    type: disk.type
                });
            });

            return fileSystems;
        });
    }
}