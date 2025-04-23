import Joi from "joi";

export const couponSchema = Joi.object({

    body:{

        code: Joi.string().trim().required().messages({
          "string.empty": "Coupon code is required",
        }),
      
        discount: Joi.number().positive().required().messages({
          "number.base": "Discount must be a number",
          "any.required": "Discount is required",
        }),
      
        isFixed: Joi.boolean().optional(),
        isPercentage: Joi.boolean().optional(),
      
        fromDate: Joi.string().required().messages({
          "any.required": "fromDate is required",
        }),
      
        toDate: Joi.string().required().messages({
          "any.required": "toDate is required",
        }),
    }
});
