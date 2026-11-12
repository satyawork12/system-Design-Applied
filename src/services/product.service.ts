import * as productRepository from '../repositories/product.repository';

export class ProductService{

    
getAllProducts = async () => {
    const products = await productRepository.findAll();

    return products;
}
}
