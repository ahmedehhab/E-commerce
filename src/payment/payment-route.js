import { Router  } from "express";
import { authorization,auth } from "../middleware/auth-middleware.js";
import SYSTEMS_ROLE from "../../utils/systems-role.js";
import { payWithCard,payWithMobileWallet,webHook } from "./payment-contoller.js";
const router=Router();

router.post('/card/:id',
    authorization,
    auth([SYSTEMS_ROLE.USER,SYSTEMS_ROLE.ADMIN]),
    payWithCard);

router.post('/wallet/:id',
    authorization,
    auth([SYSTEMS_ROLE.USER,SYSTEMS_ROLE.ADMIN]),
    payWithMobileWallet);

router.get('/webhook',webHook);

export default router;