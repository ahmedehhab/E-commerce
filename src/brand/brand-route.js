import { Router  } from "express";
import {auth,authorization} from "../middleware/auth-middleware.js";
import SYSTEMS_ROLE from "../../utils/systems-role.js";
import { multerMiddleHost } from "../middleware/multer.js";
import allowedExtensions from "../../utils/allowExtensions.js";
import validator from "../middleware/validator.js";

import { 
    createBrand,
    getAllBrandsWithCategoryId,
    deleteBrand,
    getBrand,
    updateBrand
} from "./brand-controller.js";

import {
    createBrandSchema,
    updateBrandSchema,
    idSchema
} from "./brand-validation.js";
const router=Router({mergeParams:true});

router.post('/:categoryId',
    multerMiddleHost({extensions:allowedExtensions.image}).single('image'),
    validator(createBrandSchema),
    authorization,
    auth([SYSTEMS_ROLE.ADMIN]),
    createBrand );

router.get('/category/:id',
    validator(idSchema),
    authorization,
    auth([SYSTEMS_ROLE.ADMIN,SYSTEMS_ROLE.USER]),
    getAllBrandsWithCategoryId );

router.get('/:id',
    validator(idSchema),
    authorization,
    auth([SYSTEMS_ROLE.ADMIN,SYSTEMS_ROLE.USER]),
    getBrand );

router.put('/:id',
    validator(updateBrandSchema),
    authorization,
    auth([SYSTEMS_ROLE.ADMIN]),
    updateBrand );

router.delete('/:id',
    validator(idSchema),
    authorization,
    auth([SYSTEMS_ROLE.ADMIN]),
    deleteBrand );

export default router;