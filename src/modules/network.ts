import { Utils } from "../utils";
import { NetworkDal } from "../dal/network";
import { INetwork } from "../interfaces/network";

export class NetworkModule {
    screen: any;
    utils: Utils;
    networkDal: NetworkDal;
    colors: string[];
    networkData: any[] = [];

    constructor(screen: any) {
        this.screen = screen;
        this.utils = new Utils();
        this.networkDal = new NetworkDal();
        this.colors = this.utils.getColors();
    }

    start(networkLine: any): void {
        this.networkData.push({
            title: " Download ",
            style: {
                line: this.colors[0]
            },
            x: new Array(61).fill(0).map((_, j) => 60 - j),
            y: new Array(61).fill(0)
        });

        this.networkData.push({
            title: " Upload ",
            style: {
                line: this.colors[1]
            },
            x: new Array(61).fill(0).map((_, j) => 60 - j),
            y: new Array(61).fill(0)
        });

        networkLine.setData(this.networkData);
        this.screen.render();

        setInterval(() => {
            this.loadData(networkLine);
        }, 1000);
    }

    private loadData(networkLine: any): void {
        this.networkDal.getDataTransferInfosAsync().then((data: INetwork) => {
            let downloadStr: string = this.utils.getAsUnit(data.received_per_second.toString()) + "/s";
            while (downloadStr.length < 12) { downloadStr = " " + downloadStr; }
            downloadStr = `${downloadStr} - `;

            let uploadStr: string = this.utils.getAsUnit(data.transferred_per_second.toString()) + "/s";
            while (uploadStr.length < 12) { uploadStr = " " + uploadStr; }
            uploadStr = `${uploadStr} - `;

            this.networkData[0].title = ` Download${downloadStr}${this.utils.getAsUnit(data.received_all.toString())}`;
            this.networkData[0].y.shift();
            this.networkData[0].y.push(data.received_per_second / 1024);

            this.networkData[1].title = ` Upload  ${uploadStr}${this.utils.getAsUnit(data.transferred_all.toString())}`;
            this.networkData[1].y.shift();
            this.networkData[1].y.push(data.transferred_per_second / 1024);

            networkLine.setData(this.networkData);

            this.screen.render();
        });
    }
}