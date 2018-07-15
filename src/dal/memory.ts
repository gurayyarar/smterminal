import * as si from "systeminformation";
import { IMemory } from "../interfaces/memory";

export class MemoryDal {
    async getMemoryCapacityInfosAsync(): Promise<IMemory> {
        return await si.mem().then((data: any) => {
            const total: number = data.total;
            const used: number = total - data.available;
            const percent: number = (used / total) * 100;
            const swapTotal: number = data.swaptotal;
            const swapUsed: number = swapTotal - data.swapfree;
            const swapPercent: number = (swapUsed / swapTotal) * 100;

            const result: IMemory = {
                total: total,
                used: used,
                percent: percent,
                swap_total: swapTotal,
                swap_used: swapUsed,
                swap_percent: swapPercent
            };
            return result;
        });
    }
}