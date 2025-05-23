// const nodemailer = require("nodemailer");
// require("dotenv").config();

// const sendEmail = async (to, subject, text) => {
//   const transporter = nodemailer.createTransport({
//     host: "smtp-relay.brevo.com",
//     port: 587,
//     auth: {
//       user: process.env.BREVO_USER,
//       pass: process.env.BREVO_PASS,
//     },
//   }); 

//   const mailOptions = {
//     from: process.env.BREVO_USER,
//     to: "rishitha2827r@gmail.com",
//   subject: "Testing SMTP",
//   text: "This is a test"
//   };

//   await transporter.sendMail(mailOptions);
// };

// module.exports = sendEmail;
