// backend/middleware/multer.js
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const resumeDir = path.join(__dirname, "..", "uploads", "resumes");
const logoDir = path.join(__dirname, "..", "uploads", "logos");
if (!fs.existsSync(resumeDir)) fs.mkdirSync(resumeDir, { recursive: true });
if (!fs.existsSync(logoDir)) fs.mkdirSync(logoDir, { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "resume") cb(null, resumeDir);
    else if (file.fieldname === "logo") cb(null, logoDir);
    else cb(null, resumeDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname.replace(/\s+/g,"_"));
  }
});

module.exports = multer({ storage });
