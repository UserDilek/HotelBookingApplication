import  express , {Request,Response}  from "express";
import multer from 'multer';
import cloudinary from 'cloudinary';
import Hotel,{ HotelType } from "../models/hotel";   
import verifyToken from "../middleware/auth";
import {body} from "express-validator"; 
  

const router  = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage:storage,
    limits:{
        fileSize:5*1024*1024
    }
})


// api/my-hotels
router.post(
    "/", 
    [
        body("name").notEmpty().withMessage("Name is Required"),
        body("city").notEmpty().withMessage("City is Required"),
        body("country").notEmpty().withMessage("Country is Required"),
        body("description").notEmpty().withMessage("Description is Required"),
        body("type").notEmpty().withMessage("Hotel type is Required"),
        body("pricePerNight").notEmpty().isNumeric().withMessage("Price per night is required and must be nımber"),
        body("facilities").notEmpty().isArray().withMessage("Facilities type is Required")
    ],
  //  upload.array("imageFiles",6) ,
    async (req:Request, res:Response) =>{
   try {
   // const imageFiles = req.files as Express.Multer.File[];
    const newHotel:HotelType = req.body;

   /* const upLoadPromises = imageFiles.map(async(img) =>{
       const b64 = Buffer.from(img.buffer).toString();
       let dataURI = "data:" + img.mimetype + ";base64";
       const res = await cloudinary.v2.uploader.upload(dataURI);

       return res.url;
    }); */

   // const imageUrls = await Promise.all(upLoadPromises);
   // newHotel.imageUrls = imageUrls;
    newHotel.lastUpdated = new Date();
    //newHotel.userId = req.userId;

    const hotel = new Hotel(newHotel);
    await hotel.save();

    res.status(201).send(hotel);


   } catch (error) {
      console.log("Error occured while creatig a hotel");
      res.status(500).json({message:"Something went wrong",al:error});
   }
});

router.get("/",async(req:Request, res:Response) =>{

    try {
        const hotels = await Hotel.find({userId:req.userId});
        res.json(hotels);
    } catch (error) {
        res.status(500).json({Message:"Something went wrong"});
    }
 
})


router.post("/delete",async(req:Request, res:Response) =>{

    try {
        const hotels = await Hotel.deleteOne({_id:req.body._id});
        res.json({message:"The hotel is deleted"});
    } catch (error) {
        res.status(500).json({Message:"Something went wrong"});
    }
 
})

export default router;