import {pool} from "../config/database"
import { CreateProductInput } from "../validation/product.validation";

export const findAll = async()=>{
    const result = await pool.query(
        'SELECT id, name, description, price, stock_quantity FROM products ORDER BY id ASC'
    )
    return result.rows;
}

export const create = async (product: CreateProductInput)=>{
    const { name, description, price, stock_quantity } = product;
    const result = pool.query("INSERT INTO products (name, description, price, stock_quantity) VALUES ($1,$2,$3,$4) RETURNING *",[name, description, price, stock_quantity]);
}