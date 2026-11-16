import { OrderService } from "../services/order.service";
import { CreateOrderType } from "../validation/order.validation";
import { Request, Response } from "express";

export class OrderController {
    constructor(private orderService: OrderService = new OrderService) {}

    async createOrder(createOrderData : CreateOrderType , res: Response){
        try{
            await this.orderService.createOrder(createOrderData)
            res.status(201).json({
                message : "Order is created successfull",
            })
        }
        catch(error){
            res.status(500).json({
                message : "Failed to create order",
                error : error instanceof Error ? error.message : "Unknown error"
                
            })
        }
    }
}