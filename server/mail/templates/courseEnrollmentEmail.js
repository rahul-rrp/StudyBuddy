exports.courseEnrollmentEmail = (courseName, name) => {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Course Registration Confirmation</title>
</head>
<body style="background-color: #ffffff; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.4; color: #333333; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px; text-align: center;">
    <a href="https://study-buddy-green.vercel.app">
      <img src="https://i.ibb.co/7Xyj3PC/logo.png" alt="StudyBuddy Logo" style="max-width: 200px; margin-bottom: 20px;" width="200">
    </a>
    <div style="font-size: 18px; font-weight: bold; margin-bottom: 20px;">Course Registration Confirmation</div>
    <div style="font-size: 16px; margin-bottom: 20px;">
      <p>Dear ${name},</p>
      <p>You have successfully registered for the course <span style="font-weight: bold;">"${courseName}"</span>. We are excited to have you as a participant!</p>
      <p>Please log in to your learning dashboard to access the course materials and start your learning journey.</p>
      <a href="https://study-buddy-green.vercel.app/dashboard" style="display: inline-block; padding: 10px 20px; background-color: #FFD60A; color: #000000; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold; margin-top: 20px;">Go to Dashboard</a>
    </div>
    <div style="font-size: 14px; color: #999999; margin-top: 20px;">
      If you have any questions or need assistance, please feel free to reach out to us at
      <a href="mailto:info@StudyBuddy.com" style="color: #999999;">info@StudyBuddy.com</a>. We are here to help!
    </div>
  </div>
</body>
</html>`;
};
