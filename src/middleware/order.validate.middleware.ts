import { NextFunction, Request, Response } from "express";
import { createOrderSchema } from "../validation/order.validation";


export const validateOrderCreation = (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const result = createOrderSchema.safeParse(data);
    if (!result.success) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: result.error.issues.map((issue) => ({
                field: issue.path.join('.'),
                message: issue.message
            }))
        });
    }
    next();
}