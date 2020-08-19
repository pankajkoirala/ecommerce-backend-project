const express= require("express")
const app=express()
const bodyParser = require("body-parser") 
const cors = require("cors")
const path = require("path");
const connection=require("./connectionDB/connect_DB")
const cloudinary=require("cloudinary").v2
require("dotenv").config



//middleware for body parser
app.use(bodyParser.json())

//middleware for cors
app.use(cors())

//cloudinary config
cloudinary.config({
  cloud_name:"pankajkoirala",
  api_key:891382289963618,
  api_secret:"3pKrB-1JvjrDFNKUNpMURXUtVJ0"
})
console.log();

//router ecommerce
const ecommerceRouter=require("./router/ecommerce")
app.use("/api",ecommerceRouter)


// routes
app.get("/",(req,res)=>{
  res.send("we are on home");
}) 



// how to we start lession to the port
app.listen(process.env.port,()=>{
  console.log(`server runnlig at${process.env.port}`);
});