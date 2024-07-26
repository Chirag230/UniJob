import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";
import { catchAsyncError } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";;

export const isAuthorized = catchAsyncError(async(req,res,next)=>{
    const {token} = req.cookies;
    if(!token)
    {
        return next(new ErrorHandler("User not Authorized",401));
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user  = await User.findById(decoded.id);  // jab bhi database se kuch karna ho toh await use karo

    next();
})