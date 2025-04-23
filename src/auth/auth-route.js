import Router from "express";
import { signUp,
    verifyEmail,
    login,
    resendTheVerificationLink,
    resetPassword,
    changePassword
} from "./auth-controller.js";

import { signUpSchema,
    loginSchema,
    resendSchema,
    changePasswordSchema
} from "./auth-validation.js";

import validator from "../middleware/validator.js";

const router = Router();

router.post('/signup', validator(signUpSchema), signUp);

router.get('/verify/:token',verifyEmail);

router.post('/login', validator(loginSchema), login);   

router.post('/resend-verification-link', validator(resendSchema),resendTheVerificationLink);

router.post('/reset-password',validator(resendSchema), resetPassword);

router.post('/change-password', validator(changePasswordSchema), changePassword);

export default router;
