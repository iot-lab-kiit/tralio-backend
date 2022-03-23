var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");
const transportConfig = require("./nodemailerConfig");

const sendMailer = async ({ to, subject, text }) => {
  var transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: "backchodikeliyebanaya@gmail.com",
        pass: "wsollkaeycleemfw",
      },
    })
  );

  var mailOptions = {
    from: "backchodikeliyebanaya@gmail.com",
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = sendMailer;
