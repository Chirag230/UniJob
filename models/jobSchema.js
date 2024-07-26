import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Please enter your job profile"],
    },
    description:{
        type:String,
        required:[true,"Please enter  job description"],
        minlength:[5,"Atleat 5 letters"],
        maxlength:[3000,"Maximum 30 letters"]
    },
    category:{
        type:String,
        required:[true,"Job category needed"],
    },
    country:{
        type:String,
        required:[true,"country is required"]
    },
    city:{
        type:String,
        required:[true,"city is required"]
    },
    location:{
        type:String,
        required:[true,"please provide exact location"],
        minlength:[5,"alteast 5"],
        maxlength:[50,"maximum 50"]
    },
    fixedSalary:{
        type:Number,
        minlength:[5,"5 figure salary atleast"],
        maxlength:[9,"max 9 figure salary"]
    },
    salaryFrom:{
        type:Number,
        minlength:[4,"4 figure salary atleast"],
        maxlength:[9,"9 figure salary atleast"]
    },
    salaryTo:{
        type:Number,
        minlength:[4,"4 figure salary atleast"],
        maxlength:[9,"9 figure salary atleast"]
    },
    expired:{
        type:Boolean,
        default:false
    },
    jobPostedOn:{
        type:Date,
        default:Date.now()
    },
    postedBy:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    }
})


export const Job = mongoose.model("Job",jobSchema);