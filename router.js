const express = require("express");
const router = express.Router();
const customer = require("./customer/customerController");
const billing=require("./billing/billingcontroller")

const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { log } = require("console");
const forgetController = require('./forget/forgetcontroller');







// var images = Date.now() + ".png";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uplods");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage }).single("image");

router.post("/newacc", customer.addData);

router.post("/login", customer.login);
 router.post("/billing",billing.bill)

 router.post("/forget",forgetController.forget)




console.log(" router ok");
module.exports = router;
