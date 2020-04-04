import {IProductRepository} from "./IProductRepository";
import * as admin from "firebase-admin";
import {Products} from "../Models/products";

export class ProductRepository implements IProductRepository{
    addStockUid(stockuid: string, product: Products):Promise<any> {
        product.stockuid = stockuid;
        return this.db().doc('products/'+ product.uid).set(product);
    }

    db(): FirebaseFirestore.Firestore {
        return admin.firestore();
    }
}
