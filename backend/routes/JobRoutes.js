const express = require("express");
const router = express.Router();
const jobCtrl = require("../controller/Jobscontroller");
const upload = require("../middleware/upload");
const protect = require("../middleware/authMiddleware");

// GET routes
router.get("/", jobCtrl.getJobs);
router.get("/saved", protect, jobCtrl.getSavedJobs);
router.get("/:id", jobCtrl.getJobById);

// CREATE JOB (Employer only)
router.post(
  "/create",
  protect,
  upload.single("companyLogo"),    // ✅ correct multer parsing
  (req, res, next) => {
    if (req.user.role !== "Employer")
      return res.status(403).json({ message: "Only employers allowed" });
    next();
  },
  jobCtrl.createJob
);

// SAVE job (candidate)
router.post(
  "/:id/save",
  protect,
  (req, res, next) => {
    if (req.user.role !== "Candidate")
      return res.status(403).json({ message: "Only candidates allowed" });
    next();
  },
  jobCtrl.toggleSaveJob
);

// GET applicants (employer)
router.get("/:id/applicants", protect, jobCtrl.getApplicants);

module.exports = router;
