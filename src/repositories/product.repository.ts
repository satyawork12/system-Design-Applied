import {pool} from "../config/database"

export const findAll = async()=>{
    const result = await pool.query(
        'SELECT * FROM products ORDER BY id ASC'
    )
    return result.rows;
}