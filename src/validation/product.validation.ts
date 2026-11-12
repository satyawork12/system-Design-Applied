import { z } from 'zod'

export const createProductSchema = z.object({
    name: z.string()
        .trim()
        .min(1, "Product name is required")
        .max(150, "Name cannot exceed 150 character"),

    description: z.string().nullable().optional(),

    price: z.number()
        .min(0, "Price can not be negative"),

    stock_quantity: z.number()
        .int('Stock quantity must be an integer')
        .min(0, 'Stock quantity cannot be negative')
        .default(0)


}).strict();

export type CreateProductInput = z.infer<typeof createProductSchema>;

export const productIdSchema = z.object({
    id: z.string()
        .regex(/^[1-9]\d*$/, 'ID must be a positive integer')
        .refine(
            (id) => BigInt(id) <= 9223372036854775807n,
            'ID exceeds BIGINT range'
        )

})