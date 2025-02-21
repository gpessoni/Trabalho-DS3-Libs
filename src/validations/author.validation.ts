import Joi from "joi";

const createAuthorSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "Name must be a string.",
    "string.empty": "Name is required.",
    "any.required": "Name is required.",
  }),
  birthYear: Joi.number().required().messages({
    "number.base": "Birth Year must be a number.",
    "any.required": "Birth Year is required.",
  }),
  nationality: Joi.string().required().messages({
    "string.base": "Nationality must be a string.",
    "string.empty": "Nationality is required.",
    "any.required": "Nationality is required.",
  }),
});

export { createAuthorSchema };
