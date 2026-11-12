import { Request, Response, NextFunction } from "express";
import { createProductSchema, productIdSchema } from "../validation/product.validation";

export const validateCreateProduct = (req: Request, res: Response, next: NextFunction) => {
    const result = createProductSchema.safeParse(req.body);

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
    req.body = result.data;
    next();
}

export const validateProductId = (req:Request,res:Response,next:NextFunction)=>{
    const result = productIdSchema.safeParse(req.params);
    if(!result.success){
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