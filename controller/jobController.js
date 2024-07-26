import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/error.js"
import { Job } from "../models/jobSchema.js";

 export const getAllJobs = catchAsyncError(async(req,res,next)=>{
    const jobs = await Job.find({expired:false});
    res.status(200).json({
        success:true,
        jobs,
    });
});

export const postJob = catchAsyncError(async(req,res,next)=>{
    const {role} = req.user // yeh hamare pass isAuthorized ke through user aayega
    if(role === "Job Seeker")
    {
        return next(new ErrorHandler("Job seeker not allowed to post",400));
    }
    const {title,description,category,country,city,location,fixedSalary,salaryFrom,salaryTo} = req.body

    if(!title || !description || !category || !country || !city || !location )
    {
        return next(new ErrorHandler("Please Provide complete details",400));
    }

    if(!fixedSalary && (!salaryFrom || !salaryTo))
    {
        return next(new ErrorHandler("Please either provide fixed salary or ranged salary"));
    }
    
    if(fixedSalary && salaryFrom && salaryTo)
    {
        return next(new ErrorHandler("Cannot enter both fixed and ranged salary"));
    }
        const postedBy = req.user._id;
        const job = await Job.create({
            title,description,category,country,city,location,fixedSalary,salaryFrom,salaryTo,
            postedBy
        })

        res.status(200).json({
            success:true,
            meassage:"Job Created Successfully",
            job,
            postedBy
        })
})


export const getmyJobs = catchAsyncError(async(req,res,next)=>{
    const {role}  =  req.user;
    if(role ==="Job Seeker")
    {
        return next(new ErrorHandler("As a Job Seeker you can't access this",400));
    }

    const myjobs = await Job.find({postedBy:req.user._id});
    res.status(200).json({
        success:true,
        myjobs,
    })
})

export const updateJob = catchAsyncError(async (req,res,next)=>{
    const {role}  =  req.user;
    if(role ==="Job Seeker")
    {
        return next(new ErrorHandler("As a Job Seeker you can't access this",400));
    }

    const {id} = req.params;
    let job = await Job.findById(id);
    if(!job){
        return next(new ErrorHandler("Job not found",404));
    }
    job = await Job.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:true
    })
    res.status(200).json({
        success:true,
        job,
        message:"Job updation done"
    });
})

export const deletejob  =  catchAsyncError(async(req,res,next)=>{
    const {role} = req.body;
    if(role==="Job Seeker"){
        return next(new ErrorHandler("cannot access this functionality"));
    }
    const {id} = req.params;
    let job = await Job.findById(id);
    if(!job){
        return next(new ErrorHandler("Job not found",404));
    }
    await job.deleteOne();
  res.status(200).json({
    success: true,
    message: "Job Deleted!",
  });
})

export const getSingleJob  = catchAsyncError(async(req,res,next)=>{
    const {id}  = req.params;
    try {
        const job =  await Job.findById(id);
        if(!job){
            return next(new ErrorHandler("Job not found",404));
        }
        res.status(200).json({
            success:true,
            job
        })
    } catch (error) {
        return next(new ErrorHandler("Invalid job id",400))
    }
})