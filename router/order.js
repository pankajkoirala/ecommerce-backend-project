const express = require ("express")
const app=express()
const path = require("path");
const router = express.Router();
const OrderSchema=require("../model/order");
const Order = require("../model/order");




//get all
router.get("/order",(req,res)=>{
  OrderSchema.find().select("address name order phoneNumber date").then((Data)=>res.json(Data)).catch((err)=>res.json(err))
})


//get by id
router.get("/order/:id",(req,res)=>{
  OrderSchema.findById({_id:req.params.id}).select("address name order phoneNumber date").then((data) => res.json(data))
  .catch((err) => res.json(err));
})


//post router
router.post("/order",(req,res)=>{
 let order=Order(req.body)
  order
    .save()
    .then((data) => res.json(data))
    .catch((err) => res.send(err));
  })
  
//delet router
router.delete("/order/:id",(req,res)=>{
  OrderSchema.remove({_id:req.params.id})
  .then((data) => res.json("data deleted"))
  .catch((err) => res.json(err));
})

  module.exports = router;