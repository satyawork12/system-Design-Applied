import { Pool } from "pg";

if(!process.env.DATABASE_URL){
    throw new Error("DATABASE_URL is missing")
}

export const pool = new Pool({
    connectionString : process.env.DATABASE_URL,

    max : 10,

    idleTimeoutMillis:30000,

    connectionTimeoutMillis: 2000,
})


pool.on("error",(err)=>{
    console.error("Unexpected database pool error:", err)
})
