const welcomeTemplate = (name) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Welcome Email</title>

  <style>
    body {
      background: #f4f6fb;
      font-family: Arial, sans-serif;
      padding: 0;
      margin: 0;
    }

    .email-container {
      background: white;
      max-width: 600px;
      margin: 40px auto;
      border-radius: 10px;
      padding: 30px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    }

    .header {
      text-align: center;
      padding-bottom: 15px;
      border-bottom: 1px solid #e5e7eb;
    }

    .header h1 {
      color: #2563eb;
      margin: 0;
      font-size: 24px;
    }

    .content h2 {
      color: #1e293b;
      margin-top: 20px;
    }

    .content p {
      color: #4b5563;
      font-size: 15px;
      line-height: 1.6;
    }

    .cta-btn {
      display: inline-block;
      margin-top: 20px;
      padding: 12px 20px;
      background: #2563eb;
      color: white;
      text-decoration: none;
      border-radius: 8px;
      font-size: 15px;
    }

    .footer {
      text-align: center;
      margin-top: 30px;
      font-size: 13px;
      color: #6b7280;
    }
  </style>
</head>

<body>
  <div class="email-container">
    <div class="header">
      <h1>Welcome to JobVerse 🎉</h1>
    </div>

    <div class="content">
      <h2>Hello ${name},</h2>

      <p>
        We're excited to have you onboard!  
        Your account has been created successfully.
      </p>

      <p>
        Start exploring thousands of jobs and career opportunities today.
      </p>

      <a class="cta-btn" href="http://localhost:5173/login">
        Get Started
      </a>
    </div>
  </div>
</body>
</html>
`;
module.exports = welcomeTemplate;
