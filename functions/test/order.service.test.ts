import {IMock, Mock, Times} from "moq.ts";
import {IStockRepository} from "../src/repositories/IStockRepository";
import {Products} from "../src/Models/products";
import {OrderService} from "../src/service/OrderService";
import {OrderLines} from "../src/Models/orderLines";
import {Orders} from "../src/Models/orders";

describe('OrderService', () =>{
    let orderService: OrderService;
    let stockRepository: IMock<IStockRepository>;
    let product: Products = {name: 'Big Burger', uid: 'lksfgngo', price: 19, stockuid: 'sædlkgæsg'};
    let orderLine: OrderLines = {product: product, count: 12};
    let order: Orders = {orderLines:[orderLine]};

    beforeEach(() => {
        stockRepository = new Mock<IStockRepository>().setup(sr => sr.subtractStock(order)).returns(Promise.resolve(order));
        orderService = new OrderService(stockRepository.object());
    });

    it('when order is processed, withdraw amount from stock', async() =>{
        await orderService.processOrder(order);
        stockRepository.verify(stockrepo => stockrepo.subtractStock(order), Times.Exactly(1));
    });
});
