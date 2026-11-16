import { Pool, PoolClient } from "pg";
import { pool } from "../config/database"
import { CreateOrdeTypeDB } from "../validation/order.validation";

export enum OrderStatus {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    CANCELLED = 'CANCELLED'
}

interface createOrder {
    userId: string,
    total_amount: string
    status: OrderStatus
}

export const addOrder = async (data: CreateOrdeTypeDB, client: Pool | PoolClient = pool) => {
    const values = [data.user_id, data.totalAmount, data.status];

    const result = await client.query("INSERT INTO orders (user_id, total_amount , status) VALUES ($1,$2,$3) RETURNING id, user_id , total_amount , status", [...values]);

    return result.rows[0];

}