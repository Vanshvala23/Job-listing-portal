const Job = require("../models/Jobs");
const Application = require("../models/Application");
const SavedJob=require("../models/SavedJobs");
const Users = require("../models/User");
exports.getJobs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 10, 50);
    const skip = (page - 1) * limit;

    const query = {};
    if (req.query.keyword) {
      const k = req.query.keyword.toLowerCase();
      query.$or = [
        { title: { $regex: k, $options: "i" } },
        { company: { $regex: k, $options: "i" } },
        { description: { $regex: k, $options: "i" } },
        { skills: { $regex: k, $options: "i" } }
      ];
    }
    if (req.query.location) query.location = { $regex: req.query.location, $options: "i" };
    if (req.query.category) query.category = req.query.category;
    if (req.query.experience) query.experience = req.query.experience;
    if (req.query.workType) query.workType = req.query.workType;
    if( req.query.companyLogo) query.companyLogo={ $exists: true, $ne: null };

    const [jobs, total] = await Promise.all([
      Job.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Job.countDocuments(query)
    ]);

    res.json({ jobs, page, totalPages: Math.ceil(total/limit), total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/jobs/:id
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("createdBy", "name email");
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.createJob = async (req, res) => {
  try {
    if (!req.body || !req.body.title || !req.body.company) {
      return res.status(400).json({ message: "Title and company are required" });
    }

    const payload = {
  title: req.body.title,
  company: req.body.company,
  location: req.body.location || "",
  category: req.body.category || "",
  experience: req.body.experience || "",
  workType: req.body.workType || "",
  skills: Array.isArray(req.body.skills)
    ? req.body.skills
    : req.body.skills
    ? JSON.parse(req.body.skills)
    : [],
  description: req.body.description || "",
  salaryMin: req.body.salaryMin || null,
  salaryMax: req.body.salaryMax || null,
  companyLogo: req.file ? `/uploads/logos/${req.file.filename}` : null,
  qualifications: req.body.qualifications || "",          // ✅ new
  responsibilities: req.body.responsibilities || "",    // ✅ new
  perks: req.body.perks
    ? Array.isArray(req.body.perks)
      ? req.body.perks
      : JSON.parse(req.body.perks)
    : [],                                                 // ✅ new
  createdBy: req.user._id,
};


    const job = await Job.create(payload);
    res.json({ message: "Job created", job });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// POST /api/jobs/:id/apply (Candidate) - multipart/form-data
exports.applyJob = async (req, res) => {
  try {
    const jobId = req.params.id;  // ✅ FIX
   

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    // Check if already applied
    const alreadyApplied = await Application.findOne({
      user: req.user.id,
      job: jobId,
    });

    if (alreadyApplied)
      return res.status(400).json({ message: "Already applied to this job" });

    // Create application
    await Application.create({
      user: req.user.id,
      job: jobId,
      candidate: req.user._id,
      employer: job.createdBy,   // 🔥 FIX: Use createdBy, NOT job.employer
      coverLetter: req.body.coverLetter,
      resume: req.file ? req.file.filename : null,
    });

    res.status(201).json({ message: "Application submitted successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err });
  }
};

// POST /api/jobs/:id/save (Candidate toggles save)
exports.toggleSaveJob = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await SavedJob.findOne({
      candidate: req.user._id,
      job: id
    });

    if (existing) {
      await SavedJob.findByIdAndDelete(existing._id);
      return res.json({ message: "Job removed from saved list" });
    }

    const saved = await SavedJob.create({
      candidate: req.user._id,
      job: id
    });

    res.json({ message: "Job saved successfully", saved });
  } catch (error) {
    console.error("SAVE JOB ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


// GET /api/jobs/saved

// GET /api/jobs/saved
exports.getSavedJobs = async (req, res) => {
  try {
    const saved = await SavedJob.find({ candidate: req.user._id })
      .populate({
        path: "job",
        model: "Job"
      })
      .populate({
        path: "candidate",
        model: "User",
        select: "name email"
      });

    const cleaned = saved.filter(s => s.job !== null);

    res.json(cleaned);
  } catch (err) {
    console.error("GET SAVED JOBS ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// GET /api/jobs/:id/applicants (Employer) — returns applicants for this job
exports.getApplicants = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    // only employer who created job or admin can view
    if (req.user.role !== "Admin" && job.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const apps = await Application.find({ job: job._id }).populate("candidate", "name email phone skills");
    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
