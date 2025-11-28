const mongoose=require('mongoose');

const verificationTokenSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    token:String,
    createdAt:{type:Date,default:Date.now,expires:3600}
});
module.exports=mongoose.model("VerificationToken",verificationTokenSchema);