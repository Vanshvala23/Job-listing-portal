const EmployerProfile = require("../models/EmployerProfile");
const User = require("../models/User");
exports.updateEmployerProfile = async (req, res) => {
  try {
    const data = { ...req.body };

    if (req.file) {
      data.logo = req.file.path;
    }

    // Save/update employer profile
    const profile = await EmployerProfile.findOneAndUpdate(
      { user: req.user._id },
      data,
      { new: true, upsert: true }
    );

    // Mark main user as profile completed
    await User.findByIdAndUpdate(req.user._id, { profileCompleted: true });

    res.json({ message: "Employer profile updated", profile });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getMyEmployerProfile = async (req, res) => {
  const profile = await EmployerProfile.findOne({ user: req.user._id });
  res.json(profile);
};
