import {IStockRepository} from "../repositories/IStockRepository";
import {Orders} from "../Models/orders";

export class OrderService {
    constructor(private stockRepo: IStockRepository){

    }
    async processOrder(order: Orders){
        return this.stockRepo.subtractStock(order);
    }
}
