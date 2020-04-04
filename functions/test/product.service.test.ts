import {IMock, Mock, Times} from "moq.ts";
import {Products} from "../src/Models/products";
import {ProductService} from "../src/service/ProductService";
import {IStockRepository} from "../src/repositories/IStockRepository";
import {IProductRepository} from "../src/repositories/IProductRepository";


describe('ProductService', () =>{
let productService: ProductService;
let stockRepository: IMock<IStockRepository>;
let product: Products = {name: 'Big Burger', uid: 'lksfgngo', price: 19, stockuid: 'sædægmsædgæ'};
let productRepo: IMock<IProductRepository>;

beforeEach(() => {
    productRepo = new Mock<IProductRepository>().setup(pro => pro.addStockUid('test', product)).returns(Promise.resolve(product));
    stockRepository = new Mock<IStockRepository>().setup(sr => sr.addStock(product)).returns(Promise.resolve(product));
    productService = new ProductService(stockRepository.object(), productRepo.object());
});

    it('when product created in database, add 5 in stock', async() =>{
        await productService.addProduct(product);
        stockRepository.verify(stockrepo => stockrepo.addStock(product), Times.Exactly(1));
    });
});
