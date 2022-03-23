const TempMail = require("../../models/authentication/unverifiedEmail");
const ApiError = require("../../error/ApiError");

const verifyMail = async (req, res, next) => {
  const { otp, transactionId } = req.body;
  console.log(transactionId);
  if (!otp || !transactionId) {
    next(ApiError.badRequest("Please Enter All Details"));
    return;
  }

  const tempEmail = await TempMail.findOne({
    $and: [{ transactionId: transactionId }, { otpCode: otp }],
  });
  if (!tempEmail) {
    next(ApiError.notFound("Otp Incorrect"));
    return;
  }
  const CurrentDate = Date.now() + 1000;

  if (tempEmail.expiresIn >= CurrentDate) {
    tempEmail.isVerified = "true";
    await tempEmail.save();
  } else {
    next(ApiError.badRequest("Otp Is Wrong Or Expired"));
    return;
  }
  res.status(200).json({ tempEmail });
};

module.exports = verifyMail;
