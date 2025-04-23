import mongoose from "mongoose";
import couponModel from "./coupon-model.js";
const OrderSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    orderItems:[{
        productId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product"
        },
        name:{
            type:String,
            required:true
        },
        quantity:{
            type:Number,
            required:true
        },
       price:{
            type:Number,
            required:true
        }
    }] ,
    
    phoneNumber:[{
        type:String,
        required:true
    }],
    shippingAddress:[{
        city: String,
        state: String,
        country: String,
        zipCode: String,
        addressLine1: String,
        addressLine2: String,
    }],
    shippingCost:{
        type:Number,
        required:true
    },
    paymentMethod: {
        type: String,
        enum: [
          "card",             // Visa / Mastercard
          "meeza",            // Meeza cards
          "wallet",           // Vodafone Cash, Orange Money, etc.
          "cash",             // Cash on Delivery 
          
        ],
        default: "card"
      },
      orderStatus:{type: String , enum:['Pending' ,'Paid','Delivered','Placed','Cancelled','Refunded'], required: true , default: 'Pending'},
      coupon:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Coupon"
      },
      totalAmount:{
        type:Number,
        required:true
      },
      isPaid:{type: Boolean, required: true, default: false},
      paidAt:{type: String},
    
    isDelivered:{type: Boolean, required: true, default: false},
    deliveredAt:{type: String},
    cancelledAt:{type: String},
    cancelledBy:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    paymobOrderId:{type:Number},
    transaction_id:{type:Number}
    
}, {timestamps:true});

OrderSchema.pre('save', async function (next) {
    try {
      
      if (this.isModified('coupon') && this.coupon) {
        const couponData = await couponModel.findById(this.coupon);
        if (couponData) {
          if (couponData.isPercentage) {
            this.totalAmount -= (this.totalAmount * couponData.discount) / 100;
          } else if (couponData.isFixed) {
            this.totalAmount -= couponData.discount;
          }
            if (this.totalAmount < 0) {
            this.totalAmount = 0;
          }
        }
        
      }
      next();
    } catch (err) {
      next(err);
    }
  });
  

const orderModel = mongoose.model('Order', OrderSchema);

export default orderModel;
