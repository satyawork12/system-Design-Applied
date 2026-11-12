import { Router } from "express";
import { ProductController } from "../controllers/product.controller";

export class ProductRoutes{
    private router : Router;
    private productController : ProductController;

    constructor(){
        this.router = Router();
        this.productController = new ProductController()
        this.initRoutes();
    }

    private initRoutes():void{
        this.router.get("/",this.productController.getProducts)
    }

    getRouter(){
        return this.router;
    }

}

export const productRoutes = new ProductRoutes();
