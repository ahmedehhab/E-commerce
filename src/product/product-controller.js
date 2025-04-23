import { nanoid } from "nanoid";
import ApiFeatures from "../../utils/api-features.js";
import { catchError ,AppError} from "../../utils/error-handler.js";
import cloudinaryConfig from "../../utils/cloudinary.js";
import getKeysModel from "../../utils/get-keys-of-the-model.js";
import productModel from "../../db/models/product-model.js";

export const createProduct=catchError(async(req,res)=>{
    const {name,description,price,discount,stock,specifications}=req.body;
    const {categoryId,brandId}=req.params;
    // await productModel.collection.dropIndex('image.public_id_1');

   //upload the image
   const images=[];
   const folderId= nanoid(6);
   if(req.files){
       const folder=`${process.env.MAIN_FOLDER}/categories/brands/product/${folderId}`;
       for(const file of req.files){
           const {public_id,secure_url}=await cloudinaryConfig().uploader.upload(file.path,{folder});
           images.push({
               public_id,
               secure_url
           })
       }
        req.folder=folder;
    }
    //create product
    const product =await productModel.create({
        name,
        description,
        price,
        ...(discount&&{discount}),
        stock,
        ...(specifications&&{specifications:JSON.parse(specifications)}),
        images,
        folderId,
        createdBy:req.user.id,
        categoryId,
        brandId
    })

    res.json({
        message:'Product created successfully',
        product
    })



});


export const getAllProducts=catchError(async(req,res)=>{
    const fields=getKeysModel(productModel);

    const apiFeatures = new ApiFeatures(productModel.find(),req.query)
    .paginate()
    .sort()
    .search()
    .limitFields()
    .filter(fields);
    const products = await apiFeatures.MongooseQuery;
    res.json({
        message:'Products fetched successfully',
        products
    });
})



export const deleteProduct=catchError(async(req,res)=>{
    const {id}=req.user;
    const {id:productId}=req.params;

    //find product by id
    const product =await productModel.findById(productId);
    if(!product){
        throw new AppError('Product not found',404);
    }
    //check if the user is the creator
    if(product.createdBy.toString() !== id.toString()){
        throw new AppError('Unauthorized', 401);
    }
    // delete images
    if (product.folderId) {
        const folder=`${process.env.MAIN_FOLDER}/categories/brands/product/${product.folderId}`;
        // Delete all resources in that folder
        await cloudinaryConfig().api.delete_resources_by_prefix(folder);

        // Delete the folder itself
        await cloudinaryConfig().api.delete_folder(folder);
    }

    //delete product
    await product.deleteOne();

    res.json({
        message:'Product deleted successfully',
        product
    });
});



export const updateProduct=catchError(async(req,res)=>{
    const {id}=req.user;
    const {id:productId}=req.params;
    const {name,description,price,discount,stock,specifications,oldPublicIds}=req.body;

    //find product by id
    const product =await productModel.findById(productId);
    if(!product){
        throw new AppError('Product not found',404);
    }
    //check if the user is the creator
    if(product.createdBy.toString() !== id.toString()){
        throw new AppError('Unauthorized', 401);
    }
    if(oldPublicIds && Array.isArray(oldPublicIds) && oldPublicIds.length > 0){
        if(!req.files){
            throw new AppError('Image is required',400);
        }
        for(const image of product.images){
            if(oldPublicIds.includes(image.public_id)){
                await cloudinaryConfig().uploader.destroy(image.public_id);
            }
        }

        product.images=product.images.filter(image=>!oldPublicIds.includes(image.public_id))
    }
    if(name) product.name=name;
    if(description) product.description=description;
    if(price) product.price=price;
    if(discount>-1) product.discount=discount;
    if(stock>-1) product.stock=stock;
    if(specifications) product.specifications=JSON.parse(specifications);
    // update product
    await product.save();
    res.json({
        message:'Product updated successfully',
        product
    })
});


export const getProduct=catchError(async(req,res)=>{
    const {id:productId}=req.params;
    const product =await productModel.findById(productId);
    if(!product){
        throw new AppError('Product not found',404);
    }
    res.json({
        message:'Product fetched successfully',
        product
    })
})