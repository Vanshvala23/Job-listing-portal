const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const {
  updateEmployerProfile,
  getMyEmployerProfile,
  getMyJobs,
  getMyApplicants,updateApplicantStatus,deleteMyJob,getMyInternships
} = require("../controller/employerController");

router.get("/me", protect, getMyEmployerProfile);

router.post(
  "/update",
  protect,
  upload.single("logo"),     // Employer logo upload
  updateEmployerProfile
);

router.get("/jobs", protect, getMyJobs);
router.get("/applicants", protect, getMyApplicants);
router.put("/applicant/status/:id", protect, updateApplicantStatus);
router.delete("/jobs/:id", protect, deleteMyJob);
router.get("/internships",protect,getMyInternships);


module.exports = router;
