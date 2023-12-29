

// const forget=(req,res)=>{
//     const{email}=req.body;
//     UserModel.findone({email:email})
//     .then(user=>{
//         if(!user){
//             return res.send({status:"user not existed"})
//         }
//         const token=jwt.sign({id:user._id},{expirIn:"id"})

//         var nodemailer = require('nodemailer');

// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'surajalpha2z@gmail.com',
//     pass: 'suraj@1998'
//   }
// });

// var mailOptions = {
//   from: 'surajalpha2z@gmail.com',
//   to: 'myfriend@yahoo.com',
//   subject: 'Rest your password',
//   text: `http://localhost:8080/forgot/${user._id}/${token}`
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//       return res.send({status:"sucess"});
//   }
// });

//     })
// }




// module.exports={forget}
const nodemailer = require('nodemailer');
// const UserModel = require('path/to/UserModel');
// Example assuming UserModel is a Mongoose model
const UserModel = require('./forgetschmea');
const { log } = require('console');


const forget = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.send({ status: "user not existed" });
    }

    const token = jwt.sign({ id: user._id }, { expiresIn: "1h" });

    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'surajalpha2z@gmail.com',
        pass: 'suraj@1998'
      }
    });

    const mailOptions = {
      from: 'surajalpha2z@gmail.com',
      to: 'sreeharialpha01@gmail.com',
      subject: 'Reset your password',
      text: `http://localhost:8080/forgot/${user._id}/${token}`
    };

    await transporter.sendMail(mailOptions);

    return res.send({ status: "success" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ status: "error" });
  }
};



module.exports = { forget };

console.log("forget ok");
