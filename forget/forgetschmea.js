
const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
      },
      resetToken: {
        type: String,
        required: true,
      },
  });



module.exports=mongoose.model("forgetpassword",userschema)
