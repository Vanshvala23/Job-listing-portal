const CandidateProfile = require("../models/CandidateProfile");
const User = require("../models/User");  // <-- VERY IMPORTANT

exports.updateCandidateProfile = async (req, res) => {
  try {
    const profileData = {
      phone: req.body.phone,
      location: req.body.location,
      experience: req.body.experience,
      education: req.body.education
    };

    // Convert skills JSON string → Array
    if (req.body.skills) {
      profileData.skills = JSON.parse(req.body.skills);
    }

    // If resume uploaded
    if (req.file) {
      profileData.resume = req.file.path;
    }

    // Update or create profile
    const profile = await CandidateProfile.findOneAndUpdate(
      { user: req.user._id },
      profileData,
      { new: true, upsert: true }
    );

    // Mark profile as completed inside User model
    const user = await User.findById(req.user._id);
    user.profileCompleted = true;
    await user.save();

    res.json(profile);

  } catch (err) {
    console.error("PROFILE UPDATE BACKEND ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};


exports.getMyCandidateProfile = async (req, res) => {
  const profile = await CandidateProfile.findOne({ user: req.user._id });
  res.json(profile);
};
