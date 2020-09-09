const mongoose = require("mongoose");
const Joi = require("joi");
const { string } = require("joi");


const ContactusSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    
  },
  aboutYou: {
    type: String,
    required: true,
  },
});
const contactus = mongoose.model("Observation", ContactusSchema)

const createContactusValidator = payload =>{
  const schema =Joi.object ( {
    firstName: Joi.string().required(),
    lastName: Joi.string()
      .required(),
      email: Joi.string().required(),
      aboutYou: Joi.string().required(),
  });
  return schema.validate(payload);
};
const UpdateContactusValidator = payload =>{
  const schema =Joi.object ( {
    firstName: Joi.string().required(),
    lastName: Joi.string()
      .required(),
      email: Joi.string().required(),
      aboutYou: Joi.string().required(),
  });
  return schema.validate(payload);
};
module.exports = {
  contactus,
  createContactusValidator,
  UpdateContactusValidator
};
