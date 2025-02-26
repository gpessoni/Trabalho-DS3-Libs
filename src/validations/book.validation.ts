import Joi from "joi";

const createBookSchema = Joi.object({
  title: Joi.string().required().messages({
    "string.base": "Title must be a string.",
    "string.empty": "Title is required.",
    "any.required": "Title is required.",
  }),
  author: Joi.string().required().messages({
    "string.base": "Author must be a string.",
    "string.empty": "Author is required.",
    "any.required": "Author is required.",
  }),
  isbn: Joi.string().required().messages({
    "string.base": "ISBN must be a string.",
    "string.empty": "ISBN is required.",
    "any.required": "ISBN is required.",
  }),
  yearPublished: Joi.number().required().messages({
    "number.base": "Year of publication must be a number.",
    "any.required": "Year of publication is required.",
  }),
  description: Joi.string().required().messages({
    "string.base": "Description must be a string.",
    "string.empty": "Description is required.",
    "any.required": "Description is required.",
  }),
  genre: Joi.string().required().messages({
    "string.base": "Genre must be a string.",
    "string.empty": "Genre is required.",
    "any.required": "Genre is required.",
  }),
});

export { createBookSchema };
