const nodemailer = require("nodemailer");
const welcomeTemplate = require("../emails/welcomeTemplate");

// Generic function to send any email
const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"JobVerse" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });
  } catch (err) {
    console.error("Error sending email:", err);
    throw err;
  }
};

// Specific welcome email
const sendWelcomeMessage = async (email, name) => {
  await sendEmail({
    to: email,
    subject: "🎉 Welcome to JobVerse!",
    html: welcomeTemplate(name),
  });
};

module.exports = { sendWelcomeMessage, sendEmail };
