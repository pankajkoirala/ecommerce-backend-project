const express = require ("express")
const app=express()
const path = require("path");
const router = express.Router();
const EcommerceSchema=require("../model/ecommerce")
const multer=require("multer")
const cloudinary=require("cloudinary").v2
require("dotenv").config()

//multer config
const storage=multer.diskStorage({
  filename:(req,file,cb)=>{
    cb(null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }

})
const upload=multer({
  storage:storage
})


//get all
router.get("/ecommerce",(req,res)=>{
  EcommerceSchema.find() .then((data) => res.json(data))
  .catch((err) => res.json(err));
})

//get by id
router.get("/ecommerce/:id",(req,res)=>{
  EcommerceSchema.findById({_id:req.params.id}) .then((data) => res.json(data))
  .catch((err) => res.json(err));
})

//post router
router.post("/ecommerce",upload.single("photo"),(req,res)=>{
cloudinary.uploader.upload(req.file.path,(err,result)=>{
  const productData = new EcommerceSchema({
    category: req.body.category,
    productName: req.body.productName,
    productCost:req.body.productCost,
    productDetail:req.body.productDetail,
    warranty:req.body.warranty,
   photo:result.secure_url
  }); 
  productData
    .save()
    .then((data) => res.send("data send successfully"))
    .catch((err) => res.json({ messege: err }));
  })
})

//update 
router.patch("/ecommerce/:id",(req,res)=>{
  EcommerceSchema.updateOne({_id:req.params.id},{$set:{
    category: req.body.category,
    productName: req.body.productName,
    productCost:req.body.productCost,
    productDetail:req.body.productDetail,
    warranty:req.body.warranty,
   photo:req.body.photo,
  }}) .then((data) => res.json("updated"))
  .catch((err) => res.json(err));
})

//delet router
router.delete("/ecommerce/:id",(req,res)=>{
  EcommerceSchema.remove({_id:req.params.id})
  .then((data) => res.json("data deleted"))
  .catch((err) => res.json(err));
})
module.exports = router;