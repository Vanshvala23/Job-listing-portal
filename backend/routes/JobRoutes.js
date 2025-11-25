// backend/routes/jobRoutes.js
const express = require("express");
const router = express.Router();
const jobCtrl = require("../controller/Jobscontroller");
const SavedJob=require("../models/SavedJobs");
const protect = require("../middleware/authMiddleware"); // your protect middleware
const multer = require("../middleware/upload"); // your multer config (uploads)

router.get("/", jobCtrl.getJobs);
router.get("/saved", protect, jobCtrl.getSavedJobs);
router.get("/:id", jobCtrl.getJobById);
// router.post("/:id/save", protect, toggleSaveJob);
// router.get("/saved/list", protect, getSavedJobs);


// create job (employer only)
router.post("/create", protect, async (req, res, next) => {
  if (req.user.role !== "Employer") return res.status(403).json({ message: "Only employers" });
  next();
}, jobCtrl.createJob);

// apply (candidate) -> file field name: resume
router.post("/:id/apply", protect, multer.single("resume"), async (req,res,next) => {
  if (req.user.role !== "Candidate") return res.status(403).json({ message: "Only candidates can apply" });
  next();
}, jobCtrl.applyJob);

// save toggle
router.post("/:id/save", protect, async (req,res,next) => {
  if (req.user.role !== "Candidate") return res.status(403).json({ message: "Only candidates" });
  next();
  
}, jobCtrl.toggleSaveJob);

// get applicants (employer)
router.get("/:id/applicants", protect, jobCtrl.getApplicants);

module.exports = router;
