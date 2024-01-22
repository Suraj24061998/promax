const mongoose = require("mongoose")
const userschema = new mongoose.Schema({
    email: String,
    password: String,

})
module.exports = mongoose.model("adminlogaccount", userschema)