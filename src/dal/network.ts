import * as si from "systeminformation";
import { INetwork } from "../interfaces/network";

export class NetworkDal {
    async getDataTransferInfosAsync(): Promise<INetwork> {
        return await si.networkStats().then((data: any) => {
            const result: INetwork = {
                received_per_second: Math.max(0, parseInt(data.rx_sec, null)),
                transferred_per_second: Math.max(0, parseInt(data.tx_sec, null)),
                received_all: Math.max(0, parseInt(data.rx, null)),
                transferred_all: Math.max(0, parseInt(data.tx, null))
            };

            return result;
        });
    }
}