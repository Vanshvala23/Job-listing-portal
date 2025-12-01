const express = require("express");
const router = express.Router();
const internshipCtrl = require("../controller/InternshipController");
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

// Public
router.get("/", internshipCtrl.getInternships);
router.get("/:id", internshipCtrl.getInternshipById);

// Protected (Employer)
router.post("/", protect, upload.single("companyLogo"), internshipCtrl.createInternship);

// Apply (Candidate)
router.post("/:id/apply", protect, upload.single("resume"), internshipCtrl.applyInternship);

module.exports = router;
