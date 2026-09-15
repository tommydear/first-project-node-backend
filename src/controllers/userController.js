
import { userModel } from "../models/userSchema.js"
import { signupValidate, loginValidate } from "../validator/userValidator.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../utils/generateToken.js"


export const About = (req, res) => {
    res.send("About")
}

export const postUser = async(req, res) => {
    try {
        
        const {username, email, password} = req.body

        const {error} = signupValidate.validate(req.body)

        if(error) {
            return res.status(400).json({
                message: error.details[0].message
            })
        }
        
        const existingUser = await userModel.findOne({email})
        
        if(existingUser) {
            return res.status(400).send({message: "User already exists"})
        }
        const newUser = new userModel({username, email, password})
        await newUser.save()


        const token = await generateToken(newUser._id)

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24 * 7 
        })

        return res.status(201).send({message: "User created successfully", user: newUser})
    } catch(err){
        if(err instanceof Error) {
            console.log(err.message, err.name)
            throw new Error(err.message)
        }
    }
    
}

export const login = async(req, res) => {
    try {
        
        const {email, password} = req.body

        const {error} = loginValidate.validate(req.body)

        if(error) {
            return res.status(400).json({
                message: error.details[0].message
            })
        }
        
        const existingUser = await userModel.findOne({email})
        
        if(!existingUser) {
            return res.status(404).send({message: "User not found, signup instead"})
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password)

        if(!isPasswordValid) {
            return res.status(400).send({message: "Invalid credentials"})
        }

        const token = await generateToken(existingUser._id)

        res.cookie("token", token, { 
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24 * 7 
        })

        return res.status(200).send({message: "User logged in successfully", user: existingUser})



    } catch(err){
        if(err instanceof Error) {
            console.log(err.message, err.name)
            throw new Error(err.message)
        }
    }
    
}


export const logout = async(req, res) => {
    try {
        res.clearCookie("token")
        return res.status(200).send({message: "User logged out successfully"})

    } catch(err){
        if(err instanceof Error) {
            return res.status(500).send({message: "Internal Server Error"})
        }
    }
}

export const getProfile = async (req, res) => {

    try{
       const user = req.user

       return res.status(200).json({
        data: user,
        message: "Profile fetched successfully!",
        status: 200
       })
    }
    catch(err){
        if (err instanceof Error) {
            return res.status(500).json({
                message: err.message
            })
        }
    }

}