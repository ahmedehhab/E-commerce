import Joi from "joi";
import objectIdValidator from "../../utils/objectIdValidator.js";

export const cartValidation = Joi.object({
    body:{

        productId: Joi.string().custom(objectIdValidator).required(),
        quantity: Joi.number().required()
    }
});