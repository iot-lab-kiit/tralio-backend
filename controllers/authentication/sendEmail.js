const TempMail = require("../../models/authentication/unverifiedEmail");
const ApiError = require("../../error/ApiError");
const sendMailer = require("../../utils/sendEmail");
const crypto = require("crypto");

const Otp = () => {
  return Math.floor(Math.random() * 100000);
};
const sendMail = async (req, res, next) => {
  const { id, email } = req.query;

  if (!id || !email) {
    next(ApiError.badRequest("Please Enter All Fields"));
  }
  const otpCode = Otp();
  const mailData = {
    to: email,
    subject: "Verification For Email Address",
    text: `${otpCode}`,
  };
  var mailsent = 1;
  try {
    await sendMailer(mailData);
  } catch (err) {
    next(ApiError.notFound("Please Enter Valid Email"));
  }

  const fifteenMinutes = 1000 * 60 * 15;
  const expiresIn = Date.now() + fifteenMinutes;
  const transactionId = crypto.randomBytes(20).toString("hex");

  try {
    const temp = await TempMail.create({
      email,
      transactionId,
      otpCode,
      expiresIn,
    });
    res.status(201).json({ temp });
  } catch (err) {
    next(ApiError.badRequest("Some Error Occured"));
  }
};

module.exports = sendMail;
