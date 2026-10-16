import Joi from "joi";

export const signupValidate = Joi.object({
    fullName: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(7).max(20).required(),
    password: Joi.string().min(8).max(16).required()
})

export const loginValidate = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(16).required()
})