const express = require("express");
const app = express();
const path = require("path");
const router = express.Router();
const {
  Ecommerce,
  createEcommerceValidator,
  updateEcommerceValidator,
} = require("../model/ecommerce");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();
//authorization check
const auth=require("../middlewear/check-auth")



//multer config
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({
  storage: storage,
});

//get all
router.get("/ecommerce", (req, res) => {
  Ecommerce.find()
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

//get by id
router.get("/ecommerce/:id", (req, res) => {
  Ecommerce.findById({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

//post router
router.post("/ecommerce", upload.single("photo"), (req, res) => {
  if (!req.file) return res.status(401).send(new Error("photo not found"));
  cloudinary.uploader.upload(req.file.path, (err, result) => {
    req.body.photo = result.secure_url;
    //validator of schema
    const { error } = createEcommerceValidator(req.body);
    if (error) return res.status(401).send(error);
    let productData = new Ecommerce(req.body);
    productData
      .save()
      .then((data) => res.send("data send successfully"))
      .catch((err) => res.json({ messege: err }));
  });
});

//update to be left to validate
router.patch("/ecommerce/:id", (req, res) => {
  const { error } = updateEcommerceValidator(req.body);
  if (error) return res.status(401).send(error.details[0].message);
  Ecommerce.updateOne(
    { _id: req.params.id },
    { $set: req.body },
    { new: true }

  )
    .then((data) => res.json("updated"))
    .catch((err) => res.json(err));
});

//delet router
router.delete("/ecommerce/:id", (req, res) => {
  Ecommerce.remove({ _id: req.params.id })
    .then((data) => res.json("data deleted"))
    .catch((err) => res.json(err));
});
module.exports = router;
