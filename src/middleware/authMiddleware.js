
import jwt from "jsonwebtoken"
import { userModel } from "../models/userSchema.js"
import dotenv from "dotenv"

dotenv.config()

const secret = process.env.SECRET_KEY

export const checkAuthentication = async(req, res, next) => {
    const token = req.cookies.token
    if(!token) {
        return res.status(404).send({message: "No token found"})
    }
     try {

        const decodedToken = await jwt.verify(token, secret)

        const user = await userModel.findById(decodedToken.id)

        if(!user) {
            return res.status(404).send({message: `User with id:${decodedToken.id} does not exist`})
        }

        req.user = user
        next()  
        
     } catch(err) {
        return res.status(401).send({message: "Invalid Token!"})
     }
} 