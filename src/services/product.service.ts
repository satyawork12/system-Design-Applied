import * as productRepository from '../repositories/product.repository';
import { CreateProductInput } from '../validation/product.validation';

export class ProductService {


    getAllProducts = async () => {
        const products = await productRepository.findAll();

        return products;
    }

    createProducts = async (product: CreateProductInput) => {
        return await productRepository.create(product);
    }
    getProductId = async (id: string) => {
        return await productRepository.getProductById(id);
    }
}

