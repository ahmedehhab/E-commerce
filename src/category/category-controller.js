import { nanoid } from "nanoid";
import ApiFeatures from "../../utils/api-features.js";
import { catchError ,AppError} from "../../utils/error-handler.js";
import cloudinaryConfig from "../../utils/cloudinary.js";
import categoryModel from "../../db/models/category-model.js";
import getKeysModel from "../../utils/get-keys-of-the-model.js";

//@desc Create new category 
//@body name 
//@file image
//@auth required
//@role admin
export const createCategory=catchError(async(req,res)=>{
    const {name}=req.body;
    const {id}=req.user;
    
    //create folder 
    const folderId= nanoid(6);
    const folder=`${process.env.MAIN_FOLDER}/Categories/${folderId}`;
    //upload image to cloudinary
    const {public_id,secure_url}=await cloudinaryConfig().uploader.upload(req.file.path,{folder});
    req.folder=folder;
   //create category
    const category =await categoryModel.create({
        name,
        image:{
            public_id,
            secure_url
        },
        folderId,
        createdBy:id
    });

    res.json({
        message:'Category created successfully',
        category
    });
});

//@desc Update category
//@body name
//@auth required
//@role admin
//@params {id}
export const updateCategory=catchError(async(req,res)=>{
    const {name,oldPublicId}=req.body;
    const {id}=req.user;
    const {id:categoryId}=req.params;
    
    //find category by id
    const category =await categoryModel.findById(categoryId);
    if(!category){
        throw new AppError('Category not found',404);
    }

    //check if the user is the creator
    if(category.createdBy.toString() !== id.toString()){
        throw new AppError('Unauthorized', 401);
    }
    
    //delete old image
    if(oldPublicId){
        if(!req.file){
            throw new AppError('Image is required',400);
        }
        if(category.image?.public_id !== oldPublicId){
            throw new AppError('Image not found',404);
        }
        //delete old image from cloudinary
        await cloudinaryConfig().uploader.destroy(oldPublicId);

        //create folder 
         const folderId= nanoid(6);
        const folder=`${process.env.MAIN_FOLDER}/Categories/${folderId}`;

        //upload image to cloudinary
        const {public_id,secure_url}=await cloudinaryConfig().uploader.upload(req.file.path,{folder});
        category.image={
            public_id,
            secure_url
        };
        category.folderId=folderId;
        req.folder=folder;
    }

    
    
    category.name=name;
    await category.save();
    
    res.json({
        message:'Category updated successfully',
        category
    });
});

//@desc Delete category
//@auth required
//@role admin
//@params {id}
export const deleteCategory=catchError(async(req,res)=>{
    const {id}=req.user;
    const {id:categoryId}=req.params;
    
    //find category by id
    const category =await categoryModel.findById(categoryId);
    if(!category){
        throw new AppError('Category not found',404);
    }
    //check if the user is the creator
    if(category.createdBy.toString() !== id.toString()){
        throw new AppError('Unauthorized', 401);
    }
     //delete image from cloudinary
    if(category.image?.public_id){
        await cloudinaryConfig().uploader.destroy(category.image.public_id);
    }
    //delete category
    await category.deleteOne();

    res.json({
        message:'Category deleted successfully',
        category
    });
});

export const getAllCatergory=catchError(async(req,res)=>{
    const fields=getKeysModel(categoryModel);

    const apiFeatures = new ApiFeatures(categoryModel.find(),req.query)
    .paginate()
    .sort()
    .search()
    .limitFields()
    .filter(fields);
    const categories = await apiFeatures.MongooseQuery;
    res.json({
        message:'Categories fetched successfully',
        categories
    });
})


export const getCatergory =catchError(async(req,res)=>{
    const {id}=req.params;
    const category = await categoryModel.findById(id);
    if(!category){
        throw new AppError('Category not found',404);
    }
    res.json({
        message:'Category fetched successfully',
        category
    });
})