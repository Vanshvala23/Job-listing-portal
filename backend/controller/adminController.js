const User = require("../models/User");

// GET ALL USERS
exports.getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

// DELETE USER
exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};

// PROMOTE USER (optional)
exports.promoteUser = async (req, res) => {
  const { role } = req.body;
  await User.findByIdAndUpdate(req.params.id, { role });
  res.json({ message: "User promoted to " + role });
};

// DASHBOARD STATS
exports.getStats = async (req, res) => {
  const users = await User.countDocuments();
  const employers = await User.countDocuments({ role: "Employer" });
  const candidates = await User.countDocuments({ role: "Candidate" });

  res.json({ users, employers, candidates });
};
