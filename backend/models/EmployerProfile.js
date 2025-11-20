const mongoose = require("mongoose");

const EmployerProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  companyName: String,
  industry: String,
  companySize: String,
  location: String,
  about: String,
  logo: String,

  contactPerson: String,
  contactEmail: String,
  contactPhone: String
});

module.exports = mongoose.model("EmployerProfile", EmployerProfileSchema);
