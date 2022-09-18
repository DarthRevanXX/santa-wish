const nodemailer = require('nodemailer');
const {
  SMTP_AUTH_USER,
  SMPT_AUTH_PASS,
  SMPT_AUTH_HOST,
  SMPT_AUTH_PORT,
} = require('../config/index');

const sendEmail = (emailOptions) => {
  const transporter = nodemailer.createTransport({
    host: SMPT_AUTH_HOST,
    port: SMPT_AUTH_PORT,
    auth: {
      user: SMTP_AUTH_USER,
      pass: SMPT_AUTH_PASS,
    },
  });

  const mailOptions = {
    from: emailOptions.from,
    to: emailOptions.to,
    subject: emailOptions.subject,
    text: emailOptions.text,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.info('test');
      throw new Error(error);
    }
    // Need explanation
    memoryDB.pop();
    console.info('Sent email...');
  });
};

exports.sendEmail = sendEmail;
