// const user = require('./otp')
// // const sentotp=async(email)=>{
//   const sentotp = async (req, res) => {
//   try{
//     // const existinuser=await user.findOne({email})
//     const existinuser = await user.findOne({ email: req.body.email });
//     if(!existinuser){
//       throw Error("error")
//     }
//     if(!existinuser.verified){
//       throw Error("email change")
//     }
//     const otpdetails={
//       email:req.body.email,
//       subject:"passwordrest",
//       msg:"creater error",
//     }
//     const createotp=await sentotp(otpdetails)
//     return createotp
//   } catch(error){
//     throw error;

//   }
// }


// module.exports={sentotp}
const express = require('express');
const router = express.Router();
const user = require('./otp');
const generateOtp = require('./forgetschmea');


router.use(express.json());

router.post("/forgetpassword", async (req, res) => {
  try {
  
    if (!req.body || !req.body.email) {
      throw new Error("Email is required in the request body");
    }

    const existinuser = await user.findOne({ email: req.body.email });

    if (!existinuser) {
      throw new Error("User not found");
    }

    if (!existinuser.verified) {
      throw new Error("Email not verified");
    }

    const otpdetails = {
      email: req.body.email,
      subject: "passwordrest",
      msg: "create error",
    };

  
    const createOtp = await generateOtp(otpdetails);

    return createOtp;
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;


