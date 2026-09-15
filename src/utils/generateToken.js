import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export const generateToken = async (userId) => {
    const secret = process.env.SECRET_KEY
    const token = await jwt.sign({id: userId}, secret, {expiresIn: "7d"})
    return token
}