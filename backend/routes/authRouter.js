const User = require("../models/User");
const express = require("express");
const { registerUser, loginUser, getMe } = require("../controller/authController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);

router.post("/check-email", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  res.json({ exists: !!user });
});


module.exports = router;
