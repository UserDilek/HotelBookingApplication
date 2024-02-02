import express ,{Request,Response}from 'express';
import cors from 'cors';
import "dotenv/config";



const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());


app.get("/api/test",async(req:Request,res:Response)=>{
  res.json({message:"This is first api example"});
})


app.listen(7000, ()=>{
    console.log("applicaiton is listening port 7000 : localhost:7000");
})  

  