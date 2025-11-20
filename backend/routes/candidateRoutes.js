const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const {
  updateCandidateProfile,
  getMyCandidateProfile
} = require("../controller/candidateController");

router.get("/me", protect, getMyCandidateProfile);

router.post(
  "/update",
  protect,
  upload.single("resume"),   // for resume upload
  updateCandidateProfile
);

module.exports = router;
