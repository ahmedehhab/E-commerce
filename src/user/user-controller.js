import mongoose from "mongoose";
import userModel from "../../db/models/user-model.js";
import { AppError,catchError } from "../../utils/error-handler.js";
import ApiFeatures from "../../utils/api-features.js";
import getKeysModel from "../../utils/get-keys-of-the-model.js";
import sendVerificationEmail from "../../utils/send-verification-email.js";
import SYSTEMS_ROLE from "../../utils/systems-role.js";

//@desc get user
//@route GET /api/user/:id
//@access can user get his own profile or admin can get any user profile
//@params {id}
export const getUser=catchError(async (req,res,next)=>{
  if(req.user.role==SYSTEMS_ROLE.USER && req.params.id!=req.user.id){
    throw new AppError('Unauthorized',401);
  }

    const user=await userModel.findById(req.params.id).select('-password -resetCode -__v,');

    if(!user){
        throw new AppError('User not found',404);
    }

    if(user.id!=req.user.id){
        throw new AppError('Unauthorized',401);
    }

    res.json(user);
})

//@desc get all users
//@route GET /api/user
//@access admin
export const getAllUsers=catchError(async (req,res,next)=>{

     const fields=getKeysModel(userModel);
    const apiFeatures=new ApiFeatures(userModel.find(),req.query)
        .filter(fields)
        .paginate()
        .sort()
        .search()
        .limitFields();
    const users = await apiFeatures.MongooseQuery;
    res.json(users);
})

//@desc update user
//@route PUT /api/user/:id
//@access can user update his own profile or admin can update any user profile
//@params {id}
export const updateUser = catchError(async (req, res, next) => {
  const keys = getKeysModel(userModel, ['_id', 'password', 'role', 'isEmailVerified', '__v', 'blocked']);

  const data = {};
  keys.forEach((key) => {
    if (req.body[key]) {
      data[key] = req.body[key];
    }
  });

  const user = await userModel.findById(req.params.id);
  if (!user) {
    throw new AppError('User not found', 404);
  }

  if (req.user.role === SYSTEMS_ROLE.USER && req.user.id.toString() !== req.params.id.toString()) {
    throw new AppError('Unauthorized', 401);
  }

  const session = await mongoose.startSession();
  session.startTransaction();
  req.session = session;

  await user.updateOne(data, { session });

  if (data.email && data.email !== user.email) {
    user.isEmailVerified = false;
    user.email = data.email;
    await user.save({ session });
    await sendVerificationEmail(req, user);
  }

  await session.commitTransaction();
  session.endSession();

  res.json({
    user: {
      id: user._id,
      name: data.name || user.name,
      email: data.email || user.email,
      phone: data.phone || user.phone,
      role: user.role,
    },
    message: 'User updated successfully',
  });
});

//@desc can admin block any user by id
//@route PUT /api/user/:id
//@access admin
//@params {id}

export const blockUser = catchError(async (req, res, next) => {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    if(user.role==SYSTEMS_ROLE.ADMIN || user.blocked){
      throw new AppError('Unauthorized', 401);
    }

    await user.updateOne({ blocked: true });


    res.json({
      message: 'User blocked successfully',
    });
  });