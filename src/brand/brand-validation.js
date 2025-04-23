import Joi from 'joi';
import objectIdValidator from '../../utils/objectIdValidator.js';


export const createBrandSchema = Joi.object({
    body:{
        name: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
          'string.empty': 'Brand name is required',
          'string.min': 'Brand name must be at least 3 characters',
          'string.max': 'Brand name must be at most 50 characters',
        })
    },
  
  params:{
    categoryId: Joi.string().custom(objectIdValidator).required()
  }
});



export const updateBrandSchema = Joi.object({
    body:{
    name: Joi.string().trim().min(2).max(50).required().messages({
      'string.base': 'Name must be a string',
      'string.empty': 'Brand name is required',
      'string.min': 'Name must be at least 2 characters',
      'string.max': 'Name must not exceed 50 characters',
    }),
  
    oldPublicId: Joi.string().optional(),
    },
   
  
    params: {
        id: Joi.string().custom(objectIdValidator).required().messages({
            'any.required': 'Brand ID is required',
            'any.invalid': 'Brand ID must be a valid ObjectId',
          })
    }
  });


export const idSchema = Joi.object({
    params:{
        id: Joi.string().custom(objectIdValidator).required().messages({
            'any.required': 'Brand ID is required',
            'any.invalid': 'Brand ID must be a valid ObjectId',
          })
    }
});