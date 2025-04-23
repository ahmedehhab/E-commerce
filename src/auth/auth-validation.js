import joi from "joi";
import SYSTEMS_ROLE from "../../utils/systems-role.js";
 
//sign up validation
export const signUpSchema=joi.object({
    body:{
        name:joi.string().required().trim().lowercase().min(3).max(50),

        email:joi.string().email().required().lowercase().trim(),

        password: joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-={}\\[\\]|:;"\'<>,.?/~`]).{8,}$'))
        .message('Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.')
        .required(),

        role:joi.string().valid(SYSTEMS_ROLE.USER, SYSTEMS_ROLE.ADMIN).required(),

        phone:joi.string()
        .pattern(/^01[0125][0-9]{8}$/)
        .message('Phone number must be a valid Egyptian number starting with 010, 011, 012, or 015')
        .required(),

        address:joi.array().items(
            joi.object({
              city: joi.string().optional(),
              state: joi.string().optional(),
              country: joi.string().optional(),
              zipCode: joi.string().optional(),
              addressLine1: joi.string().optional(),
              addressLine2: joi.string().optional(),
            })
          ).optional()
    }
})



export const loginSchema =joi.object({
   body:{
    email: joi.string()
    .email()
    .lowercase()
    .trim()
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Please enter a valid email address',
    }),

  password: joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/)
    .required()
    .messages({
      'string.empty': 'Password is required',
      'string.pattern.base': 'Password must be at least 8 characters long, include an uppercase letter, lowercase letter, number, and special character',
    })
   }    

})



//resendlink and reset password validation
export const resendSchema =joi.object({
    body:{
        email:joi.string().email().required().lowercase().trim(),
    }
})


//change password validation
export const changePasswordSchema =joi.object({
    body:{
        resetCode: joi.string()
    .pattern(/^[0-9]{4}$/)  // Ensures it's exactly 4 digits
    .message('Reset code must be exactly 4 digits')
    .required(),
        newPassword:joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-={}\\[\\]|:;"\'<>,.?/~`]).{8,}$'))
        .message('Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.')
        .required(),
        email:joi.string().email().required().lowercase().trim(),
    }
})