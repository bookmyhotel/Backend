const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'reyna39@ethereal.email',
        pass: 'q4XY8YsjR1E426dF4h'
    }
});
const sendMail = function(to, msg){
    var mailOptions = {
        from: '"Admin bookmyhotel.live ✉️" <admin@bookmyhotel.live>',
        to: to || 'myfriend@yahoo.com',
        subject: 'Booking confirmation',
        text: msg || "Yee!! Your booking has been confirmed."
      };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}
module.exports = sendMail;