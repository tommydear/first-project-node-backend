import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

import express from "express";
import userRoutes from "./routes/userRoutes.js";
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const app = express()



mongoose.connect(process.env.MONGODB_URI_2).then((result) => {
    console.log("Database connected successfully")
}).catch((error) => {
        console.log(error)
    })


    app.use(express.json())

app.use("/api", userRoutes)

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.listen(8080, () => {
    console.log("Server is running on port 8080")
})