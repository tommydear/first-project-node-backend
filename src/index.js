import express from "express";
import userRoutes from "./routes/userRoutes";

const app = express()

app.use(express.json())
app.use("/api", userRoutes)

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.listen(8080, () => {
    console.log("Server is running on port 8080")
})