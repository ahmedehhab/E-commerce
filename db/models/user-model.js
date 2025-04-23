import mongoose from "mongoose";
import SYSTEMS_ROLE from "../../utils/systems-role.js";

const UserSchema = new mongoose.Schema({

    email: { type: String, required: true, unique: true, trim: true, lowercase: true },

    password: { type: String, required: true },
    
    resetCode: { type: String },

    name: { type: String, required: true ,trim: true, lowercase: true ,minlength:3,maxlength:50},

    address:[{
        city: String,
        state: String,
        country: String,
        zipCode: String,
        addressLine1: String,
        addressLine2: String,
    }],
    phone: { type: String, required: true },

    role: { type: String, enum: [SYSTEMS_ROLE.USER, SYSTEMS_ROLE.ADMIN], default: SYSTEMS_ROLE.USER,required:true},

    isEmailVerified: { type: Boolean, default: false  },

    blocked: { type: Boolean, default: false },
    
    coupon:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Coupon"
    }
    
},{timestamps:true});

const User = mongoose.model('User', UserSchema);

export default User;
