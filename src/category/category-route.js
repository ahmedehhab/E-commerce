import { Router  } from "express";
import { authorization,auth } from "../middleware/auth-middleware.js";
import validator from "../middleware/validator.js";
import SYSTEMS_ROLE from "../../utils/systems-role.js";
import {multerMiddleHost} from "../middleware/multer.js";
import allowedExtensions from "../../utils/allowExtensions.js";
import {
     createCategory,
    updateCategory,
    deleteCategory,
    getAllCatergory,
    getCatergory
 } from "./category-controller.js";

import { 
    createCategorySchema,
    updateCategorySchema,
    deleteCategorySchema,
    getCategorySchema
 } from "./category-validation.js";


const router= Router();

router.post('/',
    multerMiddleHost({extensions:allowedExtensions.image}).single('image'),
    validator(createCategorySchema),
    authorization,
    auth([SYSTEMS_ROLE.ADMIN]),
    createCategory );

router.put('/:id',
    validator(updateCategorySchema),
    authorization,
    auth([SYSTEMS_ROLE.ADMIN]),
    updateCategory );

router.delete('/:id',
    validator(deleteCategorySchema),
    authorization,
    auth([SYSTEMS_ROLE.ADMIN]),
    deleteCategory);

router.get('/',authorization,auth([SYSTEMS_ROLE.ADMIN,SYSTEMS_ROLE.USER]),getAllCatergory);
router.get('/:id',validator(getCategorySchema),authorization,auth([SYSTEMS_ROLE.ADMIN,SYSTEMS_ROLE.USER]),getCatergory);

export default router;