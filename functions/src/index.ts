import * as functions from 'firebase-functions';
import {ProductService} from "./service/ProductService";
import {StockRepository} from "./repositories/StockRepository";
import {Products} from "./Models/products";
import * as admin from "firebase-admin";
import {ProductRepository} from "./repositories/ProductRepository";
import {OrderService} from "./service/OrderService";
import {Orders} from "./Models/orders";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
admin.initializeApp();
const repo = new StockRepository();
const productRepo = new ProductRepository();
const productService = new ProductService(repo, productRepo);
const orderservice = new OrderService(repo);

exports.onProductAdded = functions.firestore.document('products/{uid}').onCreate((snap, context) =>{
 const product = snap.data() as Products;
 product.uid = snap.id;
 return productService.addProduct(product);
});

exports.onProductProcessed = functions.firestore.document('orders/{uid}').onCreate((snap, context) =>{
 const order = snap.data() as Orders;
 return orderservice.processOrder(order);
});
