import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide your name"],
        minlength:[3,"Name must atleast have 3 characters"],
        maxlength:[20,"Name must not exceed 20 characters"]
    },
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail,"Email is not valid"]
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
        match: [/^\d{10}$/, "Phone number must be exactly 10 digits"]
    },
    password:{
        type:String,
        required:true,
        minlength:[5,"Password must have length greater than 5"],
        select:false
    },
    role:{
        type:String,
        required:true,
        enum: ["Job Seeker", "Employer"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
}, { timestamps: true })

//isse call karne ki need nahi hai!!
userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        next();//agar kuch change nhi hua toh hashing nhi kari!! matlab koi aur field change kari but password wali nhi
    }
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getJWTToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRE });
};



export const User  = mongoose.model("User",userSchema);