import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

import express from "express";
import userRoutes from "./routes/userRoutes.js";
import mongoose from "mongoose"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"



dotenv.config()

const app = express()



mongoose.connect(process.env.MONGODB_URI_2).then((result) => {
    console.log("Database connected successfully")
}).catch((error) => {
        console.log(error)
    })

    app.use(cors({
        origin: "http://localhost:5174",
        credentials: true,
        methods: ["GET", "POST", "DELETE"]
    }))


    app.use(express.json())
    app.use(cookieParser())

app.use("/api", userRoutes)

app.get("/", (req, res) => {
    res.send("Hello World")
})

if(process.env.NODE_ENV !== "production") {
    app.listen(8080, () => {
        console.log("Server is running on port http://localhost:8080")
    })
}

export default app; 