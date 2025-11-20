const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const {
  updateEmployerProfile,
  getMyEmployerProfile
} = require("../controller/employerController");

router.get("/me", protect, getMyEmployerProfile);

router.post(
  "/update",
  protect,
  upload.single("logo"),     // Employer logo upload
  updateEmployerProfile
);

module.exports = router;
