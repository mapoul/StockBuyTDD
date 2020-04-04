import {Products} from "../Models/products";
import {IStockRepository} from "../repositories/IStockRepository";
import {IProductRepository} from "../repositories/IProductRepository";
import {Stock} from "../Models/stock";

export class ProductService {
    constructor(private stockRepository: IStockRepository, private productRepo: IProductRepository) {
    }
    async addProduct(product: Products){
        const x: Stock = await this.stockRepository.addStock(product);
        if(x.stockuid && product.uid)
        {
        this.productRepo.addStockUid(x.stockuid, product);
        }
    }
}
