import Joi from 'joi';
import objectIdValidator from '../../utils/objectIdValidator.js';

export const createProductSchema = Joi.object({
    body:{
        name: Joi.string().min(3).max(50).trim().required(),
        description: Joi.string().trim().required(),
        price: Joi.number().positive().required(),
        discount: Joi.number().min(0).max(100).optional(),
        stock: Joi.number().integer().min(1).required(),
        specifications: Joi.alternatives()
          .try(
            Joi.object().pattern(Joi.string(), Joi.array().items(Joi.string())), 
            Joi.string() 
          )
          .optional(),

    },
    params:{
      categoryId: Joi.string().custom(objectIdValidator).required(),
      brandId: Joi.string().custom(objectIdValidator).required(),
    }
  });

export const updateProductSchema = Joi.object({

    body:{

        name: Joi.string().trim().min(3).max(50).optional(),
        description: Joi.string().trim().optional(),
        price: Joi.number().positive().optional(),
        discount: Joi.number().min(0).max(100).optional(),
        stock: Joi.number().integer().min(0).optional(),
        specifications: Joi.alternatives()
          .try(
            Joi.object().pattern(Joi.string(), Joi.array().items(Joi.string())), 
            Joi.string() 
          )
          .optional(),
        oldPublicIds: Joi.array().items(Joi.string()).optional(),
    },

  params: {
    id: Joi.string().custom(objectIdValidator).required().messages({
        'any.required': 'Product ID is required',
        'any.invalid': 'Product ID must be a valid MongoDB ObjectId',
      })
  }
});

export const idSchema = Joi.object({
    params:{
        id: Joi.string().custom(objectIdValidator).required().messages({
            'any.required': 'Product ID is required',
            'any.invalid': 'Product ID must be a valid MongoDB ObjectId',
          })
    }
});