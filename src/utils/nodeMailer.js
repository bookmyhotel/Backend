const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD,
  },
});
const sendMail = function (to, msg) {
  var mailOptions = {
    from: '"Admin bookmyhotel.live ✉️" <admin@bookmyhotel.live>',
    to: to || "myfriend@yahoo.com",
    subject: "Booking confirmation",
    text: msg || "Yee!! Your booking has been confirmed.",
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
module.exports = sendMail;
