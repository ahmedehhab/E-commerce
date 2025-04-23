import jwt from "jsonwebtoken";
import userModel from "../../db/models/user-model.js";
import { AppError,catchError } from "../../utils/error-handler.js";
export const auth= (roles)=>{
    return catchError(async (req, res, next) => {
         if(roles.includes(req.user.role)){
            next();
        }else{
            throw new AppError('Unauthorized',401);
        }
    })
}

export const authorization=catchError(async(req,res,next)=>{
    
    if(!req.headers.authorization){
        throw new AppError('Unauthorized',401);
    }
    const token = req.headers.authorization.split(" ")[1];
         
        // check if the token is valid
        const decoded= await jwt.verify(token,process.env.SECRET_KEY);
        
        // check if the user is excist
        const user=await userModel.findById(decoded.id);
        
        // check if the user is excist and the role is correct
        if(!user){
            throw new AppError('Unauthorized',401);
        }
        
        // store the user in the request object
        req.user={
            id:user._id,
            role: user.role,
        };
        
        next();
    
})