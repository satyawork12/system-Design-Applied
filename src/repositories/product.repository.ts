import { pool } from "../config/database"
import { CreateProductInput, ProductUpdateInput } from "../validation/product.validation";

export const findAll = async () => {
    const result = await pool.query(
        'SELECT id, name, description, price, stock_quantity FROM products ORDER BY id ASC'
    )
    return result.rows;
}

export const create = async (product: CreateProductInput) => {
    const { name, description, price, stock_quantity } = product;
    const result = pool.query("INSERT INTO products (name, description, price, stock_quantity) VALUES ($1,$2,$3,$4) RETURNING *", [name, description, price, stock_quantity]);
}

export const getProductById = async (id: string) => {
    const result = await pool.query(
        `SELECT id, name, description, price, stock_quantity
         FROM products
         WHERE id = $1`,
        [id]
    );

    return result.rows[0] ?? null;
};

export const updateProduct = async (id: string, product: ProductUpdateInput) => {
    const fields = Object.keys(product);
    const values = Object.values(product);
    const setClause = fields.map((field, index) => `${field} = $${index + 1}`).join(', ');

    const result = await pool.query(
        `UPDATE products
         SET ${setClause}
         WHERE id = $${values.length + 1}
         RETURNING id, name, description, price, stock_quantity`,
        [...values, id]
    );

    return result.rows[0] ?? null;
};