import { Utils } from "../utils";
import { MemoryDal } from "../dal/memory";

export class MemoryModule {
    screen: any;
    utils: Utils;
    memoryDal: MemoryDal;
    memoryLoadData: any[];
    colors: string[];

    constructor(screen: any) {
        this.screen = screen;
        this.utils = new Utils();
        this.memoryDal = new MemoryDal();
        this.memoryLoadData = [];
        this.colors = this.utils.getColors();
    }

    start(memorySwapLine: any, memorySwapDonut: any): void {
        this.memoryLoadData.push({
            title: " Memory",
            style: {
                line: this.colors[0]
            },
            x: new Array(61).fill(0).map((_, j) => 60 - j),
            y: new Array(61).fill(0)
        });

        this.memoryLoadData.push({
            title: " Swap",
            style: {
                line: this.colors[1]
            },
            x: new Array(61).fill(0).map((_, j) => 60 - j),
            y: new Array(61).fill(0)
        });

        memorySwapLine.setData(this.memoryLoadData);
        this.screen.render();

        setInterval(() => {
            this.loadData(memorySwapLine, memorySwapDonut);
        }, 1000);
    }

    private loadData(memorySwapLine: any, memorySwapDonut: any): void {
        this.memoryDal.getMemoryCapacityInfosAsync().then((data: any) => {
            const memoryStr: string = `${this.utils.loadString(data.percent.toFixed(1), 7)}\%`;
            const swapStr: string = `${this.utils.loadString(data.swap_percent.toFixed(1), 9)}\%`;

            this.memoryLoadData[0].title = ` Memory${memoryStr}`;
            this.memoryLoadData[0].y.shift();
            this.memoryLoadData[0].y.push(data.percent);

            this.memoryLoadData[1].title = ` Swap${swapStr}`;
            this.memoryLoadData[1].y.shift();
            this.memoryLoadData[1].y.push(data.swap_percent);

            memorySwapLine.setData(this.memoryLoadData);

            const memoryDonutText: string = `${this.utils.getAsUnit(data.used)} of ${this.utils.getAsUnit(data.total)}`;
            const swapDonutText: string = `${this.utils.getAsUnit(data.swap_used)} of ${this.utils.getAsUnit(data.swap_total)}`;

            memorySwapDonut.setData([
                {
                    label: memoryDonutText,
                    color: this.colors[0],
                    percent: parseInt(data.percent.toFixed(), null)
                },
                {
                    label: swapDonutText,
                    color: this.colors[1],
                    percent: parseInt(data.swap_percent.toFixed(), null)
                }
            ]);

            this.screen.render();
        });
    }
}