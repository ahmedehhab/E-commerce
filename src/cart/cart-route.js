import { Router  } from "express";
import { authorization,auth } from "../middleware/auth-middleware.js";
import SYSTEMS_ROLE from "../../utils/systems-role.js";
import validator from "../middleware/validator.js";
import { cartValidation } from "./cart-validation.js";
import { 
    addToCart,
    getCart,
    deleteFromCart
} from "./cart-controller.js";

const router=Router();

router.post('/',
    validator(cartValidation),
    authorization,
    auth([SYSTEMS_ROLE.ADMIN,SYSTEMS_ROLE.USER]),
    addToCart);

router.get('/',
    authorization,
    auth([SYSTEMS_ROLE.ADMIN,SYSTEMS_ROLE.USER]),
    getCart);

router.put('/delete',
    validator(cartValidation),
    authorization,
    auth([SYSTEMS_ROLE.ADMIN,SYSTEMS_ROLE.USER]),
    deleteFromCart);

export default router;