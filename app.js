import express, { urlencoded } from "express"
import dotenv from 'dotenv'
import cors from "cors"
import cookieParser from "cookie-parser"
dotenv.config({path:"./config/config.env"})
import cloudinary from "cloudinary";
import fileUpload from "express-fileupload"
import userRouter from "./routes/userRouter.js"
import jobRouter from "./routes/jobRouter.js"
import applicationRouter from "./routes/applicationRouter.js"
import {dbConnection} from "./database/dbConnection.js"
import { errorMiddleware } from "./middleware/error.js"
// cloudinary.v2.config({
//     cloud_name:process.env.CLOUDINARY_CLIENT_NAME,
//     api_key:process.env.CLOUDINARY_CLIENT_API,
//     api_secret:process.env.CLOUDINARY_CLIENT_SECRET,
// })

const app = express();
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:['GET','POST','PUT','DELETE'],
    credentials:true
}))

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/",
}))


app.use("/api/v1/user",userRouter);
app.use("/api/v1/job",jobRouter);
app.use("/api/v1/application",applicationRouter);

dbConnection()

const PORT = process.env.PORT||3000;

app.get('/',(req,res)=>{
    res.send("HEADACHE")
})

app.use(errorMiddleware);//isko hamesha last mei use karna chahiye

// app.listen(process.env.PORT, () => {
//     console.log(`Server running at port ${process.env.PORT}`);
//   });
export default app;