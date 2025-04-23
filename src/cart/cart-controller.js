import cartModel from "../../db/models/cart-model.js";
import productModel from "../../db/models/product-model.js"
import { AppError,catchError } from "../../utils/error-handler.js";
import {checkQuantityAvaliable} from "./utils/check-quantity-avaliablr.js";

export const addToCart=catchError(async(req,res)=>{

    const { productId, quantity } = req.body;
    const {id}=req.user; 

    //get the product 
     const product =await productModel.findById(productId); 

     // if the product is not found or the stock isn't enough  can not add the product and the quantity must be greater than zero 
     if(!product){
        throw new AppError('the product is not found',404)
     }
     
     if(quantity <= 0 || quantity > product.stock){
        throw new AppError('the quantity is not available',404);
     }
     const data={
            productId:product._id,
            name:product.name,
            price:product.price,
            quantity,
            finalPrice:product.price*quantity
        }
    

    //check if the user has cart    
    
     let cart = await cartModel.findOne({userId:id});

    // if the user hasn't cart create cart to this user

     if(!cart){

        cart= await cartModel.create({ userId:id, products:[data] });

     }else{

      // check if the product into the cart
      let isFound=false;

     for (const item of cart.products) {
        
        if (item.productId.equals(productId)){
              // make the falg found 
              isFound=true;
              // check of the total quantity is avilabale
              if(item.quantity+quantity >product.stock) 
                throw new AppError('the quantity is not available ',404);

            item.quantity+=quantity;
            item.finalPrice+= item.price*quantity;
          }
      } 

       //if the product is not in the cart push it into the cart
      if(!isFound){
        cart.products.push(data);
      }


    await  cart.save();
     }

 res.json({
    message:"the product is added successfully",
    cart
 })   
}) 




export const getCart= catchError(async(req,res)=>{
   const {id}=req.user;
   //get the cart of the user
   let cart = await cartModel.findOne({userId:id});
   if(!cart){
    throw new AppError('the cart is not found',404)
   }
  //check if the products quantity is still available
  cart = await checkQuantityAvaliable(cart);

   res.json({
    message:"the cart is fetched successfully",
    cart
   })
})


export const deleteFromCart = catchError(async (req, res) => {
   const { id } = req.user;
   const { productId, quantity } = req.body;

   const cart = await cartModel.findOne({ userId: id });
   if (!cart) {
       throw new AppError('Cart not found', 404);
   }

   const product = cart.products.find(p => p.productId.equals(productId));
   if (!product) {
       throw new AppError('Product not found in cart', 404);
   }

   if (product.quantity < quantity) {
       throw new AppError('Requested quantity exceeds available quantity in cart.', 422);
   }

   if (product.quantity === quantity) {
       cart.products = cart.products.filter(p => !p.productId.equals(productId));
       if (cart.products.length === 0) {
           await cart.deleteOne();
           return res.json({
               message: "Product removed and cart is now empty.",
               cart: null
           });
       }
   } else {
       product.quantity -= quantity;
       product.finalPrice -= product.price * quantity;
   }
   await cart.save();

   res.json({
       message: "Product quantity updated successfully.",
       cart
   });
});
