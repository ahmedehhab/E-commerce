import Joi from 'joi';
import objectIdValidator from '../../utils/objectIdValidator.js';

export const createCategorySchema = Joi.object({
 body:{
    name: Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({
      'string.empty': 'Category name is required',
      'string.min': 'Category name must be at least 3 characters',
      'string.max': 'Category name must be at most 50 characters',
    })
 }
});

export const updateCategorySchema = Joi.object({
  body:{
    name: Joi.string()
    .min(3)
    .max(50)
    .messages({
      'string.min': 'Category name must be at least 3 characters',
      'string.max': 'Category name must be at most 50 characters',
    })
  },
  params:{
    id: Joi.string().custom(objectIdValidator).required().messages({
        'any.required': 'Category ID is required',
        'any.invalid': 'Category ID must be a valid ObjectId',
      }),
  }
});


export const deleteCategorySchema = Joi.object({
  params:{
    id: Joi.string().custom(objectIdValidator).required().messages({
      'any.required': 'Category ID is required',
      'any.invalid': 'Category ID must be a valid ObjectId',
    })
  }
});

export const getCategorySchema = Joi.object({
  params:{
    id: Joi.string().custom(objectIdValidator).required().messages({
      'any.required': 'Category ID is required',
      'any.invalid': 'Category ID must be a valid ObjectId',
    })
  }
});