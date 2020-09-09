const express = require("express");
const app = express();
const path = require("path");
const router = express.Router();
const nodemailer = require("nodemailer");
const {
  UpdateContactusValidator,
  contactus,
  createContactusValidator,
} = require("../model/contactus");
const { info } = require("console");
const xoauth2=require("xoauth2")
//auth verify
const auth=require("../middlewear/check-auth")


//get all
router.get("/contactus", (req, res) => {
  contactus
    .find()
    .select("firstName lastName email aboutYou")
    .then((Data) => res.json(Data))
    .catch((err) => res.json(err));
});

//get by id
router.get("/contactus/:id", (req, res) => {
  contactus
    .findById({ _id: req.params.id })
    .select("firstName lastName email aboutYou")
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

//post router & auth is to check token
router.post("/contactus",auth,(req, res) => {
  console.log(req.body);
  const { error } = createContactusValidator(req.body);
  if (error) return res.status(401).send(error);
  let contactusData = new contactus(req.body);
  contactusData
    .save()
    .then((data) => res.send("feedback send"))
    .catch((err) => res.json({ messege: err }));
});

//update
router.put("/contactus/:id", (req, res) => {
  const { error } = UpdateContactusValidator(req.body);
  if (error) return res.status(401).send(error);

  const observation = contactus
    .findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
    .then((data) => res.send("updated"))
    .catch((err) => res.send(err));
});

//delet router
router.delete("/contactus/:id", (req, res) => {
  contactus
    .remove({ _id: req.params.id })
    .then((data) => res.json("data deleted"))
    .catch((err) => res.json(err));
});

module.exports = router;
