const User = require("../../models/user/userSchema");
const TempMail = require("../../models/authentication/unverifiedEmail");
const ApiError = require("../../error/ApiError");
const { attachCookiesToResponse, createTokenUser } = require("../../utils");

const register = async (req, res, next) => {
  const { userEmail } = req.body;

  const emailExistance = await User.findOne({ userEmail });
  if (emailExistance) {
    next(ApiError.badRequest("This email already exists."));
  }
  console.log(emailExistance);
  try {
    const isVerifiedEmail = await TempMail.findOne({ email: userEmail });
    console.log(isVerifiedEmail);
    if (isVerifiedEmail && isVerifiedEmail.isVerified !== "true") {
      next(ApiError.badRequest("Email not verified"));
      return;
    }
  } catch (err) {
    next(ApiError.badRequest("Email not verified"));
    return;
  }

  //creating the user
  const user = await User.create(req.body);

  //creating the jwt token
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });

  res.status(201).json({ user: tokenUser });
};

module.exports = register;
