import {OrderLines} from "./orderLines";

export interface Orders {
    uid?:string,
    orderLines: OrderLines[];
}
