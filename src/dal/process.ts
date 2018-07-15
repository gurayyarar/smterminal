import * as si from "systeminformation";
import { IProcess } from "../interfaces/process";

export class ProcessDal {
    async getAllActiveProcessesAsync(): Promise<IProcess[]> {
        return await si.processes().then((data: any) => {
            let processList: IProcess[] = [];

            data.list.forEach((item: any, index: number) => {
                processList.push({
                    priority: item.priority,
                    user: item.user,
                    command: item.command,
                    process_id: item.pid,
                    cpu_usage_percent: parseFloat(item.pcpu.toFixed(1)),
                    memory_usage_percent: parseFloat(item.pmem.toFixed(1))
                });
            });

            return processList;
        });
    }
}