const User = require("../../models/user/userSchema");
const bcrypt = require("bcrypt");
const ApiError = require("../../error/ApiError");
const jwt = require("jsonwebtoken");
const { attachCookiesToResponse, userTokenInfo } = require("../../utils");

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};

const isTokenValid = (token) => jwt.verify(token, process.env.JWT_SECRET);

const login = async (req, res, next) => {
  const { username, userEmail, userPassword } = req.body;

  if (!userEmail || !userPassword) {
    next(ApiError.BadRequest("Please provide both email and password"));
    return;
  }

  try {
    var foundUser = await User.findOne({ username: username });
    if (!foundUser) foundUser = await User.findOne({ userEmail: userEmail });

    if (!foundUser) {
      next(ApiError.notFound("User not found"));
      return;
    }

    const validPassword = await bcrypt.compare(
      userPassword,
      foundUser.userPassword
    );

    if (!validPassword) {
      next(ApiError.badRequest("Invalid Password"));
      return;
    }

    const tokenInfo = userTokenInfo(foundUser);
    const access_token = attachCookiesToResponse({ res, user: tokenInfo });

    res.status(200).json({
      message: "User Authentication Successfull",
      user: foundUser,
      token: tokenInfo,
      access_token: access_token
    });
  } catch (err) {
    next(ApiError.internalServerError(err.message));
  }

  next();
};

module.exports = login;
