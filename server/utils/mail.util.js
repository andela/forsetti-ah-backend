import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const { EMAIL_ADDRESS, EMAIL_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_ADDRESS,
    pass: EMAIL_PASSWORD,
  },
});

/**
 * Send Email to recipient
 * @param {Object} emailPayload - Information about Email to be sent
 * @param {String} emailPayload.email - The Recipient Email
 * @param {String} emailPayload.subject - The Email Subject
 * @param {String} emailPayload.message - The message to be sent can include html tags
 * @returns {Object} Response
 */
const sendMail = async (emailPayload) => {
  const {
    email,
    subject,
    message,
  } = emailPayload;


  const mailOptions = {
    from: `Authors Haven <${EMAIL_ADDRESS}>`,
    to: email,
    subject,
    html: message,
  };

  let response = {};
  try {
    response = await transporter.sendMail(mailOptions);
    response.status = 'success';
  } catch (error) {
    response.status = 'failure';
    response.message = error.message;
  }
  return response;
};

export default sendMail;
