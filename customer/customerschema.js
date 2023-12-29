const mongoose=require("mongoose")
const userschema=new mongoose.Schema({
   name:String,
   mobile:String,
   password:String,

})
module.exports=mongoose.model("newaccount",userschema)