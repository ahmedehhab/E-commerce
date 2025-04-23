import orderModel from "../../db/models/order-model.js";
import { catchError,AppError } from "../../utils/error-handler.js";
import Product from "../../db/models/product-model.js";
import couponModel from "../../db/models/coupon-model.js";
import { checkQuantityAvaliable } from "../cart/utils/check-quantity-avaliablr.js";
import cartModel from "../../db/models/cart-model.js";
import { refund } from "../payment/utils/refund.js";


// create order for product directly
export const createOrder=catchError(async (req, res) => {
    const {phoneNumber,shippingAddress,paymentMethod,coupon,quantity}=req.body;
    const {productId}=req.params;
      const {id:userId}=req.user;

     //check if the product exists
     const product=await Product.findById(productId);
     if(!product){
        throw new AppError("Product not found",404);
     }
     
     //check if the product is available
     if(product.quantity<quantity){
        throw new AppError("Product is not available",404);
     }

     //check if the coupon exists
     const couponData=await couponModel.find({code:coupon});

     if (!couponData[0]  || new Date() > couponData[0].toDate) {
        throw new AppError("Coupon not found or expired", 404);
    }
    
   
   const data={
    productId:product._id,
    name:product.name,
    quantity,
    price:product.finalPrice*quantity
   }
  const order= await orderModel.create({
    userId,
    orderItems:[data],
    phoneNumber,
    shippingAddress,
    paymentMethod,
    totalAmount:data.price + (+process.env.SHIPPING_COST),
    coupon:couponData[0]._id,
    shippingCost:+process.env.SHIPPING_COST
  })
  product.stock-=quantity;
  await product.save();
  res.status(200).json({
    message:"Order created successfully",
    order
  })
   

}); 


//create order by cart 

export const createOrderByCart=catchError(async (req, res) => {
    const {phoneNumber,shippingAddress,paymentMethod,coupon}=req.body;
    const {id:userId}=req.user;

    //get user cart
    const cart=await cartModel.findOne({userId});
    if(!cart){
        throw new AppError("Cart not found",404);
    }

    //check if the cart is empty
    if(cart.products.length===0){
        throw new AppError("Cart is empty",404);
    }
    const cartItems=await checkQuantityAvaliable(cart);

    //check if the coupon exists
    const couponData=await couponModel.find({code:coupon});
    if(!couponData[0] || new Date() > new Date(couponData[0].toDate)){
        throw new AppError("Coupon not found or expired",404);
    }
    const orderItems =[];

    cartItems.products.forEach(async item=>{
        orderItems.push({
            productId:item.productId,
            name:item.name,
            quantity:item.quantity,
            price:item.finalPrice
        })
        //decrease the stock
        const product=await Product.findById(item.productId);
        product.stock-=item.quantity;
        await product.save();
    });

    const order= await orderModel.create({
        userId,
        orderItems,
        phoneNumber,
        shippingAddress,
        paymentMethod,
        totalAmount:cart.subTotalPrice+(+process.env.SHIPPING_COST),
        coupon:couponData[0]._id,
        shippingCost:+process.env.SHIPPING_COST
    });
    
    res.status(200).json({
        message:"Order created successfully",
        order
    })

});


//go to deliver order

export const deliverOrder=catchError(async (req, res) => {
    const {id:orderId}=req.params;
    const order=await orderModel.findById(orderId);
    if(!order){
        throw new AppError("Order not found",404);
    }

    if(order.orderStatus=="Delivered"){
        throw new AppError("Order is already delivered",404);
    }

    if(!order.isPaid&&order.paymentMethod!="cash"){
        throw new AppError("Order is not paid",404);
    }
    
    order.orderStatus="Delivered";
    order.deliveredAt=new Date().toISOString();
    order.isDelivered=true;
    await order.save();
    res.status(200).json({
        message:"Order delivered successfully",
        order
    })
});



export const cancellOrder=catchError(async (req, res) => {
    const {id:orderId}=req.params;
    const {id:userId}=req.user;
    const order=await orderModel.findById(orderId);
    if(!order){
        throw new AppError("Order not found",404);
    }

    // check if it is paid
    let refundResponse;
    if(order.isPaid){
       refundResponse = await refund(order); 
    }

    //return the stock
    order.orderItems.forEach(async (item) => {
        await Product.updateOne(
            { _id: item.productId },
            { $inc: { stock: item.quantity } }
        );
    });
    order.orderStatus="Cancelled";
    order.cancelledAt=new Date().toISOString();
    await order.save();
    res.json({
        message:"Order cancelled successfully",
        refundResponse
    });
})



