const EmployerProfile = require("../models/EmployerProfile");
const User = require("../models/User");
const Job = require("../models/Jobs");
const Application = require("../models/Application");
const sendEmail=require("../utils/emailService").sendEmail;
exports.updateEmployerProfile = async (req, res) => {
  try {
    const data = { ...req.body };

    if (req.file) {
      data.logo = req.file.path;
    }

    // Save/update employer profile
    const profile = await EmployerProfile.findOneAndUpdate(
      { user: req.user._id },
      data,
      { new: true, upsert: true }
    );

    // Mark main user as profile completed
    await User.findByIdAndUpdate(req.user._id, { profileCompleted: true });

    res.json({ message: "Employer profile updated", profile });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getMyEmployerProfile = async (req, res) => {
  const profile = await EmployerProfile.findOne({ user: req.user._id });
  res.json(profile);
};

exports.getMyJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user._id });
  res.json(jobs);
};

exports.getMyApplicants = async (req, res) => {
  const apps = await Application.find({ employer: req.user._id })
    .populate("candidate", "name email")
    .populate("job", "title")
    .sort({ createdAt: -1 });

  const formatted = apps.map((a) => ({
    _id: a._id,
    jobTitle: a.job.title,
    userName: a.candidate.name,
    status: a.status,
    appliedAgo: timeAgo(a.createdAt),
  }));

  res.json(formatted);
};


function timeAgo(date) {
  const ms = Date.now() - new Date(date).getTime();
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  return `${days} days ago`;
}
exports.updateApplicantStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // Validate allowed statuses
    const allowedStatuses = ["applied","viewed","shortlisted","rejected","hired"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const application = await Application.findById(req.params.id)
      .populate("candidate", "name email")
      .populate("job", "title"); // Populate job for email

    if (!application) return res.status(404).json({ message: "Application not found" });

    application.status = status;
    await application.save();

    // Compose email
    let subject = `Application Update: ${status}`;
    let message = `Hi ${application.candidate.name},\n\nYour application for "${application.job.title}" has been updated to "${status}".`;

    if (status === "shortlisted") {
      message += "\n\nCongratulations! You have been shortlisted for the next round.";
    } else if (status === "viewed") {
      message += "\n\nYour application has been viewed by HR.";
    } else if (status === "rejected") {
      message += "\n\nWe regret to inform you that your application was not successful.";
    } else if (status === "hired") {
      message += "\n\nCongratulations! You have been selected for the position.";
    }

    await sendEmail({
      to: application.candidate.email,
      subject,
      text: message,
    });

    res.json({ message: "Status updated and email sent", application });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteMyJob = async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id   // Extra security
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found or not authorized" });
    }

    res.json({ message: "Job deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

