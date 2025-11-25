
const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
    employer: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true
},
  job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  candidate: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  resume: { type: String }, 
  coverLetter: { type: String },
  expectedSalary: { type: String },
  status: { type: String, enum: ["applied","viewed","shortlisted","rejected","hired"], default: "applied" },
  appliedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Application", ApplicationSchema);
