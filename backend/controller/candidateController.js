const CandidateProfile = require("../models/CandidateProfile");
const User = require("../models/User");  // <-- VERY IMPORTANT
const Application = require("../models/Application");
const SavedJob = require("../models/SavedJobs");
const Job = require("../models/Jobs");
exports.updateCandidateProfile = async (req, res) => {
  try {
    const profileData = {
      phone: req.body.phone,
      location: req.body.location,
      experience: req.body.experience,
      education: req.body.education,
    };

    // skills array
    if (req.body.skills) {
      profileData.skills = JSON.parse(req.body.skills);
    }

    // resume upload
    if (req.files?.resume) {
      profileData.resume = "/uploads/resumes/" + req.files.resume[0].filename;
    }

    // profile image upload
    if (req.files?.profileImage) {
      profileData.photo = "/uploads/profiles/" + req.files.profileImage[0].filename;
    }

    // Update DB
    const profile = await CandidateProfile.findOneAndUpdate(
      { user: req.user._id },
      profileData,
      { new: true, upsert: true }
    );

    // Flag profile completed
    const user = await User.findById(req.user._id);
    user.profileCompleted = true;
    await user.save();

    res.json(profile);

  } catch (err) {
    console.error("PROFILE UPDATE BACKEND ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getCandidateDashboard = async (req, res) => {
  try {
    const profile = await CandidateProfile.findOne({ user: req.user._id });

    const applied = await Application.countDocuments({ candidate: req.user._id });
    const saved = await SavedJob.countDocuments({ candidate: req.user._id });

    const recommendedJobs = await Job.find()
      .sort({ createdAt: -1 })
      .limit(6);

    let strength = 0;
    if (profile?.skills?.length) strength += 30;
    if (profile?.resume) strength += 30;
    if (profile?.experience) strength += 20;
    if (profile?.bio) strength += 20;

    res.json({
      profile,
      appliedJobs: applied,
      savedJobs: saved,
      profileStrength: strength,
      recommended: recommendedJobs
    });

  } catch (err) {
    console.error("DASHBOARD ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getMyCandidateProfile = async (req, res) => {
  const profile = await CandidateProfile.findOne({ user: req.user._id });
  res.json(profile);
};
