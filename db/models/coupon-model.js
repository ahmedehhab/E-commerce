import mongoose from "mongoose";

const CouponSchema = new mongoose.Schema({
    code:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minlength:3,
        maxlength:50
    },
    discount:{
        type:Number,
        min:1,
        required:true
    },
    isFixed:{
        type:Boolean,
    },
    isPercentage:{
        type:Boolean,
    },
    status:{
        type:String,
        enum:["active","expired"],
        default:"active"
    },
    fromDate:{
        type:Date,
        required:true
    },
    toDate:{
        type:Date,
        required:true
    },
    addedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

},{timestamps:true});
CouponSchema.post('find',function(docs){
    docs.forEach((coupon) => {
        if (new Date() > new Date(coupon.toDate)) {
            coupon.status = "expired";
        }
    });
})

const couponModel = mongoose.model('Coupon', CouponSchema);

export default couponModel;