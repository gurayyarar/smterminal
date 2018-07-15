import * as si from "systeminformation";

export class CpuDal {
    async getCpuMainInfoAsync(): Promise<any> {
        return await si.cpu();
    }

    async getCpuCoresAsync(): Promise<any> {
        return await si.currentLoad();
    }

    async getCoreLoadDatasAsync(): Promise<number[]> {
        return await this.getCpuCoresAsync().then((data: any) => {
            var results: number[] = [];

            data.cpus.forEach((cpu: any, index: number) => {
                results.push(parseFloat(cpu.load.toFixed(1)));
            });

            return results;
        });
    }
}