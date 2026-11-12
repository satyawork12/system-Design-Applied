import express from "express"
import dotenv from "dotenv"
import {pool} from "./config/database"
dotenv.config({path : ".env.dev"});

const app = express();

const PORT = process.env.PORT;


app.get("/health", (req, res) => {
    const result = pool.query("SELECT NOW()");
    res.json({
        "query result" : result,
        "status": "ok",
        "service": "system-design-applied"
    })
})

app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`)
})