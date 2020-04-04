import {Products} from "../Models/products";
import {Orders} from "../Models/orders";

export interface IStockRepository {
    addStock(product: Products): Promise<any>;
    subtractStock(order: Orders): Promise<any>;
}
