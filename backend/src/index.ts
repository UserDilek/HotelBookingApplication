import express ,{Request,Response}from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';
import userRoutes from './routes/user';
import authRoutes from './routes/auth';
import myHotelRoutes from './routes/my-hotels';
import cookieParser from 'cookie-parser';
import {v2 as cloudinary} from 'cloudinary';
import path = require('path');  

cloudinary.config({
 cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
 api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_TICKET
})

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:process.env.FRONTEND_URL ,
    credentials:true
}));
app.use(express.static(path.join(__dirname,"../../frontend/dist")));

app.use("/api/auth" ,authRoutes);
app.use("/api/users" ,userRoutes);
app.use("/api/my-hotels" ,myHotelRoutes);


app.listen(7000, ()=>{
    console.log("applicaiton is listening port 7000 : localhost:7000");
})  

  