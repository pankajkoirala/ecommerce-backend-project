const mongoose = require("mongoose");
const Joi = require("joi");


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
  warranty: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
});

const Ecommerce = mongoose.model("Ecommerce", EcommerceSchema);

const createEcommerceValidator = payload => {
  const  schema = Joi.object({
    category: Joi.string().required(),
    productName: Joi.string()
      .required(),
      productCost: Joi.number().required(),
      productDetail: Joi.string().required(),
      date: Joi.date(),
      warranty: Joi.string().required(),
      photo:  Joi.string().required(),
  });
  return schema.validate(payload)
};
const updateEcommerceValidator = payload => {
  const schema = Joi.object({
    category: Joi.string().required(),
    productName: Joi.string()
      .required(),
      productCost: Joi.number().required(),
      productDetail: Joi.string().required(),
      date: Joi.date(),
      warranty: Joi.string().required(),
      photo:  Joi.string().required(),
  });
  return schema.validate(payload);
};
module.exports = {
  Ecommerce,
  createEcommerceValidator,
  updateEcommerceValidator
};
