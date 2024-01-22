const express = require("express");
const router = express.Router();
const customer = require("./customer/customerController");
const billing = require("./billing/billingcontroller")
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { log } = require("console");
const forgetController = require('./forget/forgetcontroller');
const { productadd, viewproduct, del, update } = require("./productadd/prodectcontroller");
const { adminlog, adlog } = require("./adminlog/adminlogcontroller");
const { sentotp } = require('./forget/forgetcontroller');
const User = require('./customer/customerschema');
const nodemailer = require('nodemailer');



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
router.post("/billing", billing.bill)
// router.post("/forget", forgetController.forget)
router.post('/addproduct',upload, productadd)
router.post('/viewproduct', viewproduct)
router.post('/viewbill', billing.viewbill)
router.post('/delete:id', del)
router.post('/update', update)
router.post('/adminaccount', adminlog)
router.post('/adminlog', adlog)
// router.post('/forgetpassword',forgetController.sentotp)



// router.post("/forgetpassword", async (req, res) => {
//   try {
   
//     if (!req.body || !req.body.email) {
//       throw new Error("Email is required in the request body");
//     }
//     const existingUser = await user.findOne({ email: req.body.email });

//     if (!existingUser) {
//       throw new Error("User not found");
//     }

//     if (!existingUser.verified) {
//       throw new Error("Email not verified");
//     }
//     const otpDetails = {
//       email: req.body.email,
//       subject: "passwordrest",
//       msg: "create error", 
//     };

    
//     const generatedOtp = await generateOtp(otpDetails);

   
//     res.json({ message: "OTP generated successfully" });
//   } catch (error) {
    
//     res.status(400).json({ error: error.message });
//   }
// });
router.post('/forgetpassword', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw new Error('Email is required in the request body');
    }
     
    const existingUser = await User.findOne({email} );
    


    if (!existingUser) {
      throw new Error('User not found');
    }

    function generateOtp() {
      const otp = Math.floor(100000 + Math.random() *900000)
      return otp.toString();
    }
   
    const resetToken = generateOtp();
    console.log(resetToken,"resetToken");
    
    existingUser.resetToken = resetToken;
    await existingUser.save();

   
    const mailOptions = {
      from: 'surajalpha2z@gmail.com',
      to: email,
      subject: 'Password Reset',
      text: `Use the following code to reset your password: ${resetToken}`,
    };

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'surajalpha2z@gmail.com',
        pass: 'gwlr hqik kuyq xweu ',
      },
    });
    await transporter.sendMail(mailOptions);

    res.json({ message: 'Reset instructions sent to your email' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});







console.log(" router ok");
module.exports = router;
