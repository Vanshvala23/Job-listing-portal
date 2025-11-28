const verificationTemplate = (userName, verificationLink) => {
  return `
    <h2>Hi ${userName}, verify your email</h2>
    <p>Click the link below to activate your account:</p>
    <a href="${verificationLink}" style="padding:10px 20px;background:#4CAF50;color:white;text-decoration:none;">
      Verify Email
    </a>
    <p>This link expires in 1 hour.</p>
  `;
};

module.exports = verificationTemplate;
