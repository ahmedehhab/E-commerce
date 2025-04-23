import axios from "axios";
import orderModel from "../../db/models/order-model.js";
import { catchError,AppError } from "../../utils/error-handler.js";
import userModel from "../../db/models/user-model.js";
import ProductModel from "../../db/models/product-model.js";
import {createPayment} from "./utils/create-payment.js";

export const payWithCard=catchError(async (req, res) => {
    const {id:orderId}=req.params;
    const {id:userId}=req.user;
    const order=await orderModel.findById(orderId);
    if(!order){
        throw new AppError("Order not found",404);
    }
    if(order.isPaid ){
        throw new AppError("Order is already paid",404);
    }
    if(order.paymentMethod!="card"){
        throw new AppError("Payment method is not card",404);
    }
    const user= await userModel.findById(userId);
    const {paymentToken,paymobOrderId}=await createPayment(user,order,process.env.PAYMOB_CARD_INTEGRATION_ID);
    
      const iframeURL = `https://accept.paymob.com/api/acceptance/iframes/${process.env.PAYMOB_IFRAME_ID}?payment_token=${paymentToken}`;
      order.paymobOrderId=paymobOrderId;
      await order.save();

      res.json({
        message: "Redirect to Paymob payment page",
        iframeURL
      });
})

export const payWithMobileWallet=catchError(async (req, res) => {
    const {id:orderId}=req.params;
    const {id:userId}=req.user;
    const order=await orderModel.findById(orderId);
    if(!order){
        throw new AppError("Order not found",404);
    }
    if(order.isPaid ){
        throw new AppError("Order is already paid",404);
    }
    if(order.paymentMethod!="wallet"){
        throw new AppError("Payment method is not wallet",404);
    }
    const user= await userModel.findById(userId);
    const {paymentToken,paymobOrderId}=await createPayment(user,order,process.env.PAYMOB_WALLET_INTEGRATION_ID);

    const walletRes = await axios.post("https://accept.paymob.com/api/acceptance/payments/pay", {
        source: {
            identifier: "01010101010",
            subtype: "WALLET",
        },
        payment_token: paymentToken,
    });

    order.paymobOrderId=paymobOrderId;
    await order.save();
    res.status(200).json({
        redirect_url: walletRes.data.redirect_url
    });
})



export const webHook=catchError(async (req, res) => {
    const {order,id}=req.query;
    console.log(id)
    const orderData=await orderModel.findOne({paymobOrderId:order});
    if(!orderData){
        throw new AppError("Order not found",404);
    }
    orderData.isPaid=true;
    orderData.paidAt=new Date().toISOString();
    orderData.orderStatus="Paid";
    orderData.transaction_id=id;
    await orderData.save();

    
    res.json();
})