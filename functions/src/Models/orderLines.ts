import {Products} from "./products";

export interface OrderLines {
    uid?:string,
    product:Products,
    count:number
}
