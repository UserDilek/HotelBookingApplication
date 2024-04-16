import express, {Request,Response} from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import { check, validationResult } from "express-validator";
import { ifError } from 'assert';
import verifyToken from "../middleware/auth";

const router = express.Router();

router.get("/me", verifyToken, async (req: Request, res: Response) => {
    const userId = req.userId;
  
    try {
      const user = await User.findById(userId).select("-password");
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "something went wrong" });
    }
  });

router.post('/register', [
   check("firstname","First Name is required").isString(),
   check("lastname","Last Name is required").isString(),
   check("email","Email is required").isEmail(),
   check("password","Password with 6 or more chacracters is required").isLength({min:6}),
     
],async(req:Request , res:Response) =>{

    const errors = validationResult(req);


    if (!errors.isEmpty()) {
        console.log("hatanın içerisine girdi mi");
        return res.status(400).json({message:errors});
    }

    try {
        let user =  await User.findOne({
            email:req.body.email,
        });

        if(user){
            return res.status(400).json({message:"User already exists."});
        }

     user = new User(req.body);
     await user.save();

     const token = jwt.sign({userId : user.id}, process.env.JWT_SECRET_KEY as string,{expiresIn:"1d"});
     res.cookie("auth-token",token, {httpOnly:true,secure:process.env.NODE_ENV === "production",maxAge:86400000});
     return res.status(200).send({ message: "User registered OK" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Something went wrong."})
    }
})

export default router;