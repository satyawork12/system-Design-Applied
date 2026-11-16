import { z } from 'zod';
import { OrderStatus } from '../repositories/order.repository';

const orderItemSchema = z.object({
    product_id: z.string()
        .regex(/^[1-9]\d*$/, 'Invalid product ID')
        .max(19)
        .refine(
            id => BigInt(id) <= 9223372036854775807n,
            'Product ID exceeds BIGINT range'
        ),

    quantity: z.number()
        .int()
        .positive()
});

export type OrderItemType = z.infer<typeof orderItemSchema>;

export type addOrderItemType = OrderItemType & { unit_price : string} 

export const createOrderSchema = z.object({
    user_id: z.string()
        .regex(/^[1-9]\d*$/, 'Invalid user ID')
        .max(19)
        .refine(
            id => BigInt(id) <= 9223372036854775807n,
            'User ID exceeds BIGINT range'
        ),

    items: z.array(orderItemSchema)
        .min(1, 'Order must contain at least one product')
});

export type CreateOrderType = z.infer<typeof createOrderSchema>;

export type CreateOrdeTypeDB = Omit<CreateOrderType,"items"> & {
    status : OrderStatus;
    totalAmount : String;
};


