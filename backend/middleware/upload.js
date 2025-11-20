const multer = require("multer");
const path = require("path");
const fs = require("fs");

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
  let folder = "";

  if (file.fieldname === "resume") folder = "uploads/resumes/";
  if (file.fieldname === "logo") folder = "uploads/logos/";

  ensureDir(folder); // Auto create if missing
  cb(null, folder);
},

  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  }
});

module.exports = multer({ storage });
