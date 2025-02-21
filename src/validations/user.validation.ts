import Joi from "joi";

const createUserSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "Name must be a string.",
    "string.empty": "Name is required.",
    "any.required": "Name is required.",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "Email must be a string.",
    "string.email": "Email must be a valid email address.",
    "any.required": "Email is required.",
  }),
  document: Joi.string().required().messages({
    "string.base": "Document must be a string.",
    "any.required": "Document is required.",
  }),
});

const updateUserSchema = Joi.object({
  name: Joi.string().messages({
    "string.base": "Name must be a string.",
  }),
  email: Joi.string().email().messages({
    "string.base": "Email must be a string.",
    "string.email": "Email must be a valid email address.",
  }),
  document: Joi.string().messages({
    "string.base": "Document must be a string.",
  }),
  isActive: Joi.boolean().messages({
    "boolean.base": "isActive must be a boolean.",
  }),
});

export { createUserSchema, updateUserSchema };
