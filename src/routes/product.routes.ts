import { Router } from "express";
import { ProductController } from "../controllers/product.controller";
import { validateCreateProduct, validateProductId, validateProductUpdate } from "../middleware/product.validate.middleware";

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
        this.router.post("/",validateCreateProduct,this.productController.createProduct)
        this.router.get("/:id",validateProductId,this.productController.getProductById)
        this.router.patch("/:id",validateProductId,validateProductUpdate,this.productController.updateProduct)
    }

    getRouter(){
        return this.router;
    }

}

export const productRoutes = new ProductRoutes();
