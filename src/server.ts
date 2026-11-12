import express from "express"
import dotenv from "dotenv"

dotenv.config();

const app = express();

const PORT = process.env.PORT;


app.get("/health", (req, res) => {
    res.json({
        "status": "ok",
        "service": "system-design-applied"
    })
})

app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`)
})