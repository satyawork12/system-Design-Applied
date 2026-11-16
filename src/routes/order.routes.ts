
import { Router } from "express"
import { OrderController } from "../controllers/order.controller";
import { validateOrderCreation } from "../middleware/order.validate.middleware";

export class OrderRoutes {
    constructor(private router: Router = Router(),
        private orderController: OrderController = new OrderController()
    ) {
        this.initRoutes()
    }

    private initRoutes() {
        this.router.post("/create",validateOrderCreation, (req, res) => this.orderController.createOrder(req.body, res));
    }
    public getRouter() {
        return this.router
    }

}

export const orderRoutes = new OrderRoutes()
