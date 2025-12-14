const express = require("express");
const router = express.Router();
const jobCtrl = require("../controller/JobsController");
const upload = require("../middleware/upload");
const protect = require("../middleware/authMiddleware");

// GET routes
router.get("/", jobCtrl.getJobs,
  async(req,res)=>
  {
    try{
      const data=await Job.find();
      res.json(data);
    }
    catch(err){
      res.status(500).json({ message: "Server error", error: err });
    }
  }
);
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

//apply
router.post(
  "/:id/apply",
  protect,
  upload.single("resume"),
  jobCtrl.applyJob
);

// GET applicants (employer)
router.get("/:id/applicants", protect, jobCtrl.getApplicants);

module.exports = router;
