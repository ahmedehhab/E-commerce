import { nanoid } from "nanoid";
import cloudinaryConfig from "../../utils/cloudinary.js";
import { catchError ,AppError} from "../../utils/error-handler.js";
import  brandModel from "../../db/models/brand-model.js";
import ApiFeatures from "../../utils/api-features.js";
import getKeysModel from "../../utils/get-keys-of-the-model.js";

//@desc Create new brand
//@body name 
//@file image
//@auth required
//@role admin
export const createBrand=catchError(async(req,res)=>{
    const {name}=req.body;
    const {id}=req.user;
    const {categoryId}=req.params;
    
    
    //brand folder 
    const folderId= nanoid(6);
    const folder=`${process.env.MAIN_FOLDER}/Categories/Brands/${folderId}`;
    //upload image to cloudinary
    const {public_id,secure_url}=await cloudinaryConfig().uploader.upload(req.file.path,{folder});
    req.folder=folder;
   //create brand
    const brand =await brandModel.create({
        name,
        image:{
            public_id,
            secure_url
        },
        folderId,
        createdBy:id,
        categoryId
    });

    res.json({
        message:'Brand created successfully',
        brand
    });

});


//@desc Delete brand
//@auth required
//@role admin
//@params {id}
export const deleteBrand=catchError(async(req,res)=>{
    const {id}=req.user;
    const {id:brandId}=req.params;
    
    //find brand by id
    const brand =await brandModel.findById(brandId);
    if(!brand){
        throw new AppError('Brand not found',404);
    }
    //check if the user is the creator
    if(brand.createdBy.toString() !== id.toString()){
        throw new AppError('Unauthorized', 401);
    }
    //delete image from cloudinary
    if(brand.image?.public_id){
        await cloudinaryConfig().uploader.destroy(brand.image.public_id);
    }
    //delete brand
    await brand.deleteOne();
    
    res.json({
        message:'Brand deleted successfully',
        brand
    });
});


export const getAllBrandsWithCategoryId=catchError(async(req,res)=>{
    req.query.categoryId=req.params.id;
   const fields=getKeysModel(brandModel);

   const apiFeatures = new ApiFeatures(brandModel.find(),req.query).filter(fields).paginate().sort().search().limitFields();
   const brands =await apiFeatures.MongooseQuery;
   res.json({ brands});
});



export const getBrand=catchError(async(req,res)=>{
    const {id}=req.params;
    const brand =await brandModel.findById(id);
    if(!brand){
        throw new AppError('Brand not found',404);
    }
    res.json({ brand});
});


export const updateBrand=catchError(async(req,res)=>{
    const {id}=req.user;
    const {id:brandId}=req.params;
    const {name,oldPublicId}=req.body;
     
    const brand =await brandModel.findById(brandId);

    if(!brand){
        throw new AppError('Brand not found',404);
    }
    //check if the user is the creator
    if(brand.createdBy.toString() !== id.toString()){
        throw new AppError('Unauthorized', 401);
    }
    if(oldPublicId){
        if(!req.file){
            throw new AppError('Image is required',400);
        }
        if(brand.image?.public_id !== oldPublicId){
            throw new AppError('Image not found',404);
        }
        //delete old image from cloudinary
        await cloudinaryConfig().uploader.destroy(oldPublicId);

        const folderId= nanoid(6);
         const folder=`${process.env.MAIN_FOLDER}/Categories/Brands/${folderId}`;

        //upload image to cloudinary
        const {public_id,secure_url}=await cloudinaryConfig().uploader.upload(req.file.path,{folder});
        req.folder=folder;

         brand.image={
            public_id,
            secure_url
        }
        brand.folderId=folderId;
    }
    brand.name=name;
    await brand.save();

    res.json({
        message: 'Brand updated successfully',
        brand
    });
});