import Joi from "joi";
import objectIdValidator from "../../utils/objectIdValidator.js";

export const mongooseId = Joi.object({
    params:{
        id: Joi.string().custom(objectIdValidator).required().messages({
            'any.required': 'User ID is required',
            'any.invalid': 'User ID must be a valid ObjectId',
          })
    }
});

export const updateUserSchema = Joi.object({
    body:{
        name: Joi.string().trim().lowercase().min(3).max(50).optional(),
        email: Joi.string().email().lowercase().trim().optional(),
        phone: Joi.string()
            .pattern(/^01[0125][0-9]{8}$/)
            .message('Phone number must be a valid Egyptian number starting with 010, 011, 012, or 015')
            .optional(),
        address: Joi.array().items(
            Joi.object({
              city: Joi.string().optional(),
              state: Joi.string().optional(),
              country: Joi.string().optional(),
              zipCode: Joi.string().optional(),
              addressLine1: Joi.string().optional(),
              addressLine2: Joi.string().optional(),
            })
          ).optional()
    },
    params:{
        id: Joi.string().custom(objectIdValidator).required().messages({
            'any.required': 'User ID is required',
            'any.invalid': 'User ID must be a valid ObjectId',
          })
    }
});