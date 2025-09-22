const nodemailer = require("nodemailer");
const doatenv = require("dotenv");
doatenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: Number(process.env.EPORT),
  secure: false, 
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

// Wrap in an async IIFE so we can use await.
async function sendMailes(to, otp) {
  try {
    const info = await transporter.sendMail({
      from: process.env.FROM,
      to,
      subject: "otpcode",
      text: "Hello world?", // pl ain‑text body
      html: ` your otp is : ${otp}`, // HTML body
    });

    console.log("Message sent:", info.messageId);
  } catch(err) {
    console.error("Failed to send email:", err);
  }
}

module.exports = {
  sendMailes,
};
