const Internship = require("../models/Internships");
const Application = require("../models/Application");
const SavedJob = require("../models/SavedJobs"); // can reuse for internships
const Users = require("../models/User");

// GET /api/internships
exports.getInternships = async (req, res) => {
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
        { skills: { $regex: k, $options: "i" } },
      ];
    }
    if (req.query.location) query.location = { $regex: req.query.location, $options: "i" };
    if (req.query.category) query.category = req.query.category;
    if (req.query.workType) query.workType = req.query.workType;
    if (req.query.companyLogo) query.companyLogo = { $exists: true, $ne: null };

    const [internships, total] = await Promise.all([
      Internship.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Internship.countDocuments(query),
    ]);

    res.json({ internships, page, totalPages: Math.ceil(total / limit), total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/internships/:id
exports.getInternshipById = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id).populate("createdBy", "name email");
    if (!internship) return res.status(404).json({ message: "Internship not found" });
    res.json(internship);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/internships (Employer)
exports.createInternship = async (req, res) => {
  try {
    const payload = {
      title: req.body.title,
      company: req.body.company,
      location: req.body.location || "",
      category: req.body.category || "",
      duration: req.body.duration || "",
      workType: req.body.workType || "",
      skills: req.body.skills ? req.body.skills.split(",") : [],
      description: req.body.description || "",
      stipend: req.body.stipend || "",
      companyLogo: req.file ? `/uploads/logos/${req.file.filename}` : null,
      qualifications: req.body.qualifications || "",
      perks: req.body.perks
        ? Array.isArray(req.body.perks)
          ? req.body.perks
          : JSON.parse(req.body.perks)
        : [],
      createdBy: req.user._id,
    };

    const internship = await Internship.create(payload);
    res.json({ message: "Internship created", internship });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// POST /api/internships/:id/apply (Candidate)
exports.applyInternship = async (req, res) => {
  try {
    const id = req.params.id;
    const internship = await Internship.findById(id);
    if (!internship) return res.status(404).json({ message: "Internship not found" });

    const alreadyApplied = await Application.findOne({
      user: req.user.id,
      internship: id,
    });

    if (alreadyApplied) return res.status(400).json({ message: "Already applied to this internship" });

    await Application.create({
      user: req.user.id,
      internship: id,
      candidate: req.user._id,
      employer: internship.createdBy,
      coverLetter: req.body.coverLetter,
      resume: req.file ? req.file.filename : null,
    });

    res.status(201).json({ message: "Application submitted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
