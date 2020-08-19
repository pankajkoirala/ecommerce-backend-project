const mongoose = require("mongoose");

const EcommerceSchema = mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  productCost: {
    type: Number,
    required: true,
  },
  productDetail: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  warranty:{
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
});



module.exports = mongoose.model("Ecommerce", EcommerceSchema);
