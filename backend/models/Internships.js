const mongoose = require("mongoose");

const InternshipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  category: { type: String },
  duration: { type: String },          // e.g., "3 Months"
  workType: { type: String },          // e.g., Remote, In-Office
  skills: { type: [String], default: [] },
  description: { type: String, default: "" },
  stipend: { type: String, default: "" }, // optional stipend info
  companyLogo: { type: String, default: null },
  qualifications: { type: String, default: "" },
  perks: { type: [String], default: [] },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Internships", InternshipSchema);
