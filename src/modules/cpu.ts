import { CpuDal } from "../dal/cpu";
import { Utils } from "../utils";

export class CpuModule {
    screen: any;
    utils: Utils;
    cpuDal: CpuDal;
    cpuLoadData: any[] = [];

    constructor(screen: any) {
        this.screen = screen;
        this.cpuDal = new CpuDal();
        this.utils = new Utils();
    }

    start(cpu: any, cpuList: any): void {
        const colors: string[] = this.utils.getColors();

        this.cpuDal.getCoreLoadDatasAsync().then((data: number[]) => {
            data.forEach((val: any, index: number) => {
                this.cpuLoadData.push({
                    title: ` CPU ${index + 1}`,
                    style: {
                        line: colors[index % colors.length]
                    },
                    x: new Array(61).fill(0).map((_, j) => 60 - j),
                    y: new Array(61).fill(0)
                });
            });

            cpu.setData(this.cpuLoadData);
            this.screen.render();

            this.loadData(cpu, cpuList);
            setInterval(() => {
                this.loadData(cpu, cpuList);
            }, 1000);
        });
    }

    private loadData(cpu: any, cpuList: any): void {
        this.cpuDal.getCoreLoadDatasAsync().then((data: any) => {
            let cpuListDatas: any[] = [];
            const headers: string[] = ["CPU#", "Usage%"];

            data.forEach((val: any, index: number) => {
                const loadStr: string = `${this.utils.loadString(val.toFixed(1), 7)}\%`;
                let dummyArray: any[] = [];

                this.cpuLoadData[index].title = ` CPU${index + 1}${loadStr}`;
                this.cpuLoadData[index].y.shift();
                this.cpuLoadData[index].y.push(val);

                dummyArray.push(`CPU${index + 1}`);
                dummyArray.push(loadStr);
                cpuListDatas.push(dummyArray);
            });

            cpuList.setData({
                headers: headers,
                data: cpuListDatas
            });

            cpu.setData(this.cpuLoadData);
            this.screen.render();
        });
    }
}