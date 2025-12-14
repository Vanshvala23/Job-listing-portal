const express = require("express");
const router = express.Router();
const SavedJob=require("../models/SavedJobs");
const Application = require("../models/Application");
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const {
  updateCandidateProfile,
  getMyCandidateProfile,getCandidateDashboard
} = require("../controller/candidateController");
router.get("/dashboard", protect, getCandidateDashboard);
router.get("/me", protect, getMyCandidateProfile);

router.post(
  "/update",
  protect,
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "profileImage", maxCount: 1 }
  ]),
  updateCandidateProfile
);

router.get("/saved", protect, async (req, res) => {
  const saved = await SavedJob.find({ candidate: req.user._id })
    .populate("job")
    .sort({ savedAt: -1 });

  res.json(saved);
});

router.get("/applied", protect, async (req, res) => {
  const applied = await Application.find({ candidate: req.user._id })
    .populate("job")
    .sort({ appliedAt: -1 });

  res.json(applied);
});

module.exports = router;
