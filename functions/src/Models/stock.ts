import {Products} from "./products";

export interface Stock {
    product: Products;
    stockCount: number;
    stockuid?: string;
}
