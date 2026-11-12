import express from "express"
import dotenv from "dotenv"
import {pool} from "./config/database"
import {productRoutes} from "./routes/product.routes"
dotenv.config({path : ".env.dev"});


const app = express();
app.use(express.json());

const PORT = process.env.PORT;


app.get("/health", async(req, res) => {
    const result = await pool.query("SELECT NOW()");
    res.json({
        "query result" : result,
        "status": "ok",
        "service": "system-design-applied"
    })
})
app.use("/products",productRoutes.getRouter())

app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`)
})