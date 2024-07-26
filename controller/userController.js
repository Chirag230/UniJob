import { catchAsyncError } from "../middleware/catchAsyncError.js"
import ErrorHandler from "../middleware/error.js"
import { User } from "../models/userSchema.js"
import {sendToken} from "../utils/jwtToken.js"

export const Register = catchAsyncError(async (req,res,next)=>{
    const{name,email,phone,password,role} = req.body
    if(!name || !email || !phone || !password ||!role)
    {
        return next(new ErrorHandler("Please Enter All the fields!"));
    }
    const isEmail = await User.findOne({email})
    if(isEmail)
    {
        return next(new ErrorHandler("Email already registered!"));
    }

    const user = await User.create({
        name,
        email,
        phone,
        password,
        role,
      });
   
    sendToken(user,200,res,"User registered Successfully")
    
})

export const login = catchAsyncError(async(req,res,next)=>{
    const {email,password,role}= req.body;
    if(!email || !password || !role)
    {
        return next(new ErrorHandler("Please provide email ,password and role."));
    }
    const user = await User.findOne({email}).select("+password");
    if(!user)
    {
        return next(new ErrorHandler("Invalid Email Or Password.", 400)); 
    }
    const isPassword = await user.comparePassword(password);
    if(!isPassword)
    {
        return next(new ErrorHandler("Invalid Email Or Password.", 400));
    }
    if(user.role !== role)
    {
        return next(
            new ErrorHandler(`User with provided email and ${role} not found!`, 404)
          );
    }

    sendToken(user,200,res,"User logged in succesfully");
})

export const logout = catchAsyncError(async(req,res,next)=>{
    res.status(201).cookie("token","",{
        httpOnly:true,
        expires:new Date(Date.now()),
        secure:true,
        sameSite:"None"        
    }).json({
        success:true,
        message:"User logged out successfully"
    })
})

export const getUser = catchAsyncError((req, res, next) => {
    const user = req.user;
    res.status(200).json({
      success: true,
      user,
    });
  });