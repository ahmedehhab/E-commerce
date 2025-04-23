import { Router  } from "express";
import { authorization,auth } from "../middleware/auth-middleware.js";
import validator from "../middleware/validator.js";
import SYSTEMS_ROLE from "../../utils/systems-role.js";
import { couponSchema } from "./coupon-validation.js";
import {
    createCoupon,
    getAllCoupons
} from "./coupon-controller.js";
const router=Router();

router.post('/',
    authorization,
    auth([SYSTEMS_ROLE.ADMIN]),
    validator(couponSchema),
    createCoupon);
router.get('/',
    authorization,
    auth([SYSTEMS_ROLE.ADMIN]),
    getAllCoupons);
export default router;