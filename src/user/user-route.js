import { Router  } from "express";
import { authorization,auth } from "../middleware/auth-middleware.js";
import validator from "../middleware/validator.js";
import { updateUserSchema ,mongooseId} from "./user-validation.js";
import SYSTEMS_ROLE from "../../utils/systems-role.js";
import {
    getUser,
    getAllUsers,
    updateUser,
    blockUser
 } from "./user-controller.js";
const router= Router();

router.get('/:id',validator(mongooseId),authorization,auth([SYSTEMS_ROLE.ADMIN,SYSTEMS_ROLE.USER]),getUser);

router.get('/',authorization,auth([SYSTEMS_ROLE.ADMIN]),getAllUsers);

router.put('/:id',validator(updateUserSchema),authorization,auth([SYSTEMS_ROLE.ADMIN,SYSTEMS_ROLE.USER]),updateUser);

router.put('/block/:id',validator(mongooseId),authorization,auth([SYSTEMS_ROLE.ADMIN]),blockUser);

export default router;
