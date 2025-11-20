const mongoose = require('mongoose');
const CandidateProfileSchema=new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    phone:String,
    location: String,
    skills: [String],
    experience: String,
    education: String,
    resume: String 
});
module.exports=mongoose.model("CandidateProfile",CandidateProfileSchema);