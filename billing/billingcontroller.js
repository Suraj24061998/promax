const user=require('./billingschema')
const bill=(req,res)=>{
    let data=user({
        firstname:req.body.firstname,
        combanyname:req.body.combanyname,
        streetaddress:req.body.streetaddress,
        appartment:req.body.appartment,
        towncity:req.body.towncity,
        phonenumber:req.body.phonenumber,
        email:req.body.email
    })
    data.save().then(data=>{
        res.json({
            status:200,
            msg:"billaccount created",
            data:data
        })
        .catch(err=>{
            res.json({
                status:500,
                msg:"billaccount not created"
            })
        })
    })

   



}
module.exports={bill}