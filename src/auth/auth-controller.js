import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import {catchError,AppError} from "../../utils/error-handler.js";
import userModel from "../../db/models/user-model.js";
import sendVerificationEmail from "../../utils/send-verification-email.js";
import sendResetCodeEmail from "../../utils/send-reset-code.js";

// @desc   Register a new user
// @route  POST /auth/signup
// @body   {name,email,password,phone ,address,role}
// @access Public
export const signUp=catchError(async (req,res,next)=>{
    const {name,email,password,phone ,address,role}=req.body;

    // hash password
    const hashedPassword=await bcrypt.hash(password,+process.env.SALT);
    const userData={
        name,
        email,
        password:hashedPassword,
        phone,
        role,
        ...(address&&{address})  
    };

     
    // check if the user is excist
    const userExists=await userModel.findOne({email});
    if(userExists){
       throw new AppError('User already exists',400);
    }
    
    //start session
    const session = await mongoose.startSession();
    session.startTransaction();
    req.session=session;

    // create user
    const user=await userModel.create([userData],{session});
        
    //send verification email
    await sendVerificationEmail(req,user[0]);

    //commit transaction
    await session.commitTransaction();

    //end the session
    session.endSession();

    res.json({
        user:{
            id:user[0]._id,
            name:user[0].name,
            email:user[0].email,
            phone:user[0].phone,
            role:user[0].role
        },
        message:"user create successfully"
    });

});

// @desc   Verify user email
// @route  GET /auth/verify/:token
// @params   {token}
// @access Public
export const verifyEmail= catchError(async (req,res)=>{
    const {token}=req.params;
    
    // Verify the token
    const decoded = jwt.verify(token, process.env.VERIFY_KEY);
    // check if token expired
   
    // Find the user by ID
    const user = await userModel.findById(decoded.id);

    if (!user) {
        throw new AppError('User not found', 404);
    }

    // Update user's email verification status
    user.isEmailVerified = true;

    // Save the updated user
    await user.save();

    res.json({
        message: 'Email verified successfully'
    });

});

//@desc   Login user
//@route  POST /auth/login
//@body   {email,password}
//@access Public

export const login =catchError(async(req,res)=>{
 const {email,password}=req.body;

 // check if the user is excist
 const user=await userModel.findOne({email});

 // check if the user is excist and the password is correct
 if(!user || await !bcrypt.compare(password,user.password)){
    throw new AppError('Invalid email or password',400);
 }
 
 // check if the email verified
 if(!user.isEmailVerified){
    throw new AppError('Email not verified',400);
 }

 // generate token
 const token=jwt.sign({id:user._id},process.env.SECRET_KEY);

 res.json({user:{
    id:user._id,
    name:user.name,
    email:user.email,
    phone:user.phone,
    role:user.role
},token});
});


//@desc   Reset the verification link
//@route  POST /auth/reset-verification-link
//@body   {email}
//@access Public
export const resendTheVerificationLink=catchError(async(req,res)=>{
    const {email}=req.body;
    
    // check if the user is excist
    const user=await userModel.findOne({email});
    if(!user){
        throw new AppError('User not found',404);
    }

    // check if the user already verified
    if(user.isEmailVerified){
        throw new AppError('Email already verified',400);
    }

    // send email verification
    await sendVerificationEmail(req,user);

    res.json({
        message: 'Verification email sent'
    });
    
})


export const resetPassword=catchError(async(req,res)=>{
    const {email}=req.body;
      
    // check if the user is excist
    const user=await userModel.findOne({email});
    if(!user){
        throw new AppError('User not found',404);
    }

    // generate reset code
    const resetCode = Math.floor(1000 + Math.random() * 9000).toString();
    user.resetCode =await bcrypt.hash(resetCode, +process.env.SALT_RESETCODE);

    //save the resetCode in user
    await user.save();
           
    // send reset code to user
    await sendResetCodeEmail(user, resetCode);

    res.json({
        message: 'Reset code sent'
    });
  
    
});



export const changePassword =catchError(async(req,res)=>{
    const {resetCode,newPassword,email}=req.body;

    // check if the user is excist
    const user=await userModel.findOne({email});
    if(!user){
        throw new AppError('User not found',404);
    }
    
    // check if the reset code is correct
    const isCodeValid = await bcrypt.compare(resetCode, user.resetCode);
    if (!isCodeValid) {
        throw new AppError('Invalid reset code', 400);
    }
    
    // hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, +process.env.SALT);
    user.password = hashedPassword;
    user.resetCode = null;
    await user.save();
    
    res.json({
        message: 'Password changed successfully'
    });
});