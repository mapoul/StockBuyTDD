import {Products} from "../Models/products";

export interface IProductRepository {

    addStockUid(stockuid: string, product: Products): void;
}
