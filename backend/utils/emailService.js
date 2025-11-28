const nodemailer = require("nodemailer");
const welcomeTemplate = require("../emails/welcomeTemplate");
const verificationTemplate = require("../emails/verificationTemplate");

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

const sendVerificationEmail = async (email, userName, verificationLink) => {
  const verificationHtml = verificationTemplate(userName, verificationLink);
  await sendEmail({
    to: email,
    subject: "Verify your JobVerse account",
    html: verificationHtml,
  });
}

module.exports = { sendWelcomeMessage, sendEmail,sendVerificationEmail };
