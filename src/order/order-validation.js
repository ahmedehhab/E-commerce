import Joi from "joi";
import objectIdValidator from "../../utils/objectIdValidator.js";
// Shipping address validation
const addressSchema = Joi.array().items({
  city: Joi.string().required(),
  state: Joi.string().optional(),
  country: Joi.string().required(),
  zipCode: Joi.string().optional(),
  addressLine1: Joi.string().required(),
  addressLine2: Joi.string().optional()
});

export const createOrderSchema = Joi.object({
    params:{
        productId: Joi.string().custom(objectIdValidator).required().messages({
            'any.required': 'Product ID is required',
            'any.invalid': 'Product ID must be a valid ObjectId',
          })
    },
    body:{

        phoneNumber: Joi.string()
          .pattern(/^(01)[0-2,5]{1}[0-9]{8}$/)
          .required()
          .messages({
            "string.pattern.base": "Phone number must be a valid Egyptian number",
            "string.empty": "Phone number is required"
          }),
      
        shippingAddress: addressSchema.required(),
      
        paymentMethod: Joi.string()
          .valid("card", "meeza", "wallet", "cash", "bank_installments")
          .required(),
      
        coupon: Joi.string().trim().optional(), 
      
        quantity: Joi.number()
          .integer()
          .min(1)
          .required()
          .messages({
            "number.base": "Quantity must be a number",
            "number.min": "Quantity must be at least 1",
            "any.required": "Quantity is required"
          })
    }
});
