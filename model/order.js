const mongoose = require("mongoose");

const orderList = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  information:{
type:String,
required:true
  },
  date: {
    type: Date,
    default:Date
    
  },
  order: [{ product: Object, count: Number }],
});
let Order=mongoose.model("order", orderList);

module.exports = Order
