import { Router  } from "express";
import { authorization,auth } from "../middleware/auth-middleware.js";
import validator from "../middleware/validator.js";
import SYSTEMS_ROLE from "../../utils/systems-role.js";
import { createOrderSchema } from "../order/order-validation.js";
import { createOrder,
    createOrderByCart,
    deliverOrder,
    cancellOrder } from "./order-controller.js";

const router=Router();

router.post('/:productId',
    validator(createOrderSchema),
    authorization,
    auth([SYSTEMS_ROLE.USER,SYSTEMS_ROLE.ADMIN]),
    createOrder);

router.post('/',
    validator(createOrderSchema),
    authorization,
    auth([SYSTEMS_ROLE.USER,SYSTEMS_ROLE.ADMIN]),
    createOrderByCart);

router.put('/:id',
    authorization,
    auth([SYSTEMS_ROLE.USER,SYSTEMS_ROLE.ADMIN]),
    deliverOrder);

router.post(
    '/cancel/:id',
    authorization,
    auth([SYSTEMS_ROLE.USER,SYSTEMS_ROLE.ADMIN]),
    cancellOrder
)
export default router;
