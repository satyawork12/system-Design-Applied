import { Request, Response } from "express";
import { ProductService } from "../services/product.service";



export class ProductController {

    constructor(private productService: ProductService = new ProductService()) { }

    getProducts = async (req: Request, res: Response) => {
        try {
            const products = await this.productService.getAllProducts();

            return res.status(200).json({
                success: true,
                count: products.length,
                data: products
            });

        } catch (error) {
            console.error(error);

            return res.status(500).json({
                message: 'Internal server error'
            });

        }
    }

    createProduct = async (req: Request, res: Response) => {
        try {
            const product = await this.productService.createProducts(req.body);

            return res.status(201).json({
                success: true,
                message: 'Product created successfully',
                data: product
            })
        }
        catch (error) {
            console.error('Error creating product:', error);

            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

}