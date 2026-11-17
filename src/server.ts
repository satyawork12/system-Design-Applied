import express from "express"
import dotenv from "dotenv"
import {pool} from "./config/database"
import {productRoutes} from "./routes/product.routes"
import { orderRoutes } from "./routes/order.routes";
dotenv.config({path : ".env.dev"});


const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;


app.get("/health", async(req, res) => {
    const result = await pool.query("SELECT NOW()");
    res.json({
        "query result" : result,
        "status": "ok",
        "service": "system-design-applied"
    })
})
app.use("/products",productRoutes.getRouter())
app.use("/order",orderRoutes.getRouter())

app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`)
    console.log(`Instance is running in ${process.env.INSTANCE_ID}`)
})