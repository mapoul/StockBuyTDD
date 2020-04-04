import {IStockRepository} from "./IStockRepository";
import {Products} from "../Models/products";
import * as admin from "firebase-admin";
import {Orders} from "../Models/orders";
import {Stock} from "../Models/stock";

export class StockRepository implements IStockRepository{


    async addStock(product: Products): Promise<Stock> {
        const stock: Stock ={product: product, stockCount: 5};
        await this.db().collection('stocks').add(stock).then(value => stock.stockuid = value.id);
        return stock;
    }

    db(): FirebaseFirestore.Firestore {
        return admin.firestore();
    }

    subtractStock(order: Orders): Promise<any> {
        order.orderLines.forEach(async orderline => {

            await this.db().doc('stocks/' + orderline.product?.stockuid).update('stockCount',
                await this.getStock(orderline.product.stockuid) - orderline.count);
        });
        return Promise.resolve(order);
    }

    async getStock(id: string): Promise<number>
    {
        const data = await this.db().doc('stocks/' + id).get();
        const stock = data.data() as Stock;

        return stock.stockCount;

    }
}
