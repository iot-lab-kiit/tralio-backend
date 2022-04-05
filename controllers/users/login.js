const User = require("../../models/user/userSchema");
const bcrypt = require("bcrypt");
const ApiError = require("../../error/ApiError");
const { attachCookiesToResponse, createTokenUser } = require("../../utils");

const login = async (req, res, next) => {
  const { username, userEmail, userPassword } = req.body;

  if (!userEmail || !userPassword)
    next(ApiError.BadRequest("Please provide both email and password"));

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

    const token = createTokenUser(foundUser);
    attachCookiesToResponse({ res, user: token });

    res.status(200).json({
      message: "User Authentication Successfull",
      user: foundUser,
      token: token,
    });
  } catch (err) {
    next(ApiError.internalServerError(err.message));
  }

  next();
};

module.exports = login;
