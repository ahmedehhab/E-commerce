import { Router  } from "express";
import { authorization,auth } from "../middleware/auth-middleware.js";
import validator from "../middleware/validator.js";
import SYSTEMS_ROLE from "../../utils/systems-role.js";
import {multerMiddleHost} from "../middleware/multer.js";
import allowedExtensions from "../../utils/allowExtensions.js";

import {
    createProduct,
    getAllProducts,
    deleteProduct,
    updateProduct,
    getProduct
} from "./product-controller.js";

import {
    createProductSchema,
    updateProductSchema,
    idSchema
} from "./product-validation.js";
const router = Router({mergeParams:true});

router.post('/:categoryId/:brandId',
    multerMiddleHost({extensions:allowedExtensions.image}).array('images',5),
    validator(createProductSchema),
    authorization,
    auth([SYSTEMS_ROLE.ADMIN]),
    createProduct);

router.get('/',
    authorization,
    auth([SYSTEMS_ROLE.ADMIN,SYSTEMS_ROLE.USER]),
    getAllProducts);

router.get('/:id',
    validator(idSchema),
    authorization,
    auth([SYSTEMS_ROLE.ADMIN,SYSTEMS_ROLE.USER]),
    getProduct);

router.delete('/:id',
    validator(idSchema),
    authorization,
    auth([SYSTEMS_ROLE.ADMIN]),
    deleteProduct);

router.put('/:id',
    validator(updateProductSchema),
    authorization,
    auth([SYSTEMS_ROLE.ADMIN]),
    updateProduct);


export default router;
