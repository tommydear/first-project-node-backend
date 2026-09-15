import Joi from "joi";

export const signupValidate = Joi.object({
    username: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(16).required()
})

export const loginValidate = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(16).required()
})