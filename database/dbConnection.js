import mongoose from "mongoose";

 export const dbConnection = ()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"PLACEMENT_PORTAL"
    }).then(()=>{
        console.log("connected to database");
    }).catch((error)=>{
        console.log(`ERROR CONNETING TO DB ${error}`);
    })
}