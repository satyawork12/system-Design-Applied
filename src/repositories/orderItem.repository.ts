import { Pool, PoolClient } from "pg";
import { pool } from "../config/database";
import { addOrderItemType, OrderItemType } from "../validation/order.validation";

export const addOrderItems = async (
    orderId: string,
    data: addOrderItemType[],
    client: Pool | PoolClient = pool
) => {
    const values: unknown[] = [];

    const placeholders = data.map((item, index) => {
        const offset = index * 4;

        values.push(
            orderId,
            item.product_id,
            item.quantity,
            item.unit_price
        );

        return `($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4})`;
    });

    const result = await client.query(
        `INSERT INTO order_items
            (order_id, product_id, quantity, unit_price)
         VALUES ${placeholders.join(', ')}
         RETURNING order_id, product_id, quantity, unit_price`,
        values
    );

    return result.rows;
};