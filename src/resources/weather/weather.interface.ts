import Joi from "joi";

export const requestValidation = Joi.object({
city: Joi.string().required(),
phoneNumber: Joi.string().required()
});