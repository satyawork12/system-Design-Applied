import * as productRepository from '../repositories/product.repository';
import { CreateProductInput, ProductUpdateInput } from '../validation/product.validation';

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

    updateProduct = async (id: string, product: ProductUpdateInput) => {
        return await productRepository.updateProduct(id, product);
    }
}

