const bcrypt = require("bcrypt");
const User = require("../../models/user/userSchema");
const {createJWT, createRefreshJWT} = require("../../helpers/createJWT");
const ApiError = require("../../error/ApiError");

const login = async (req, res, next) => {
  const { username, userEmail, userPassword } = req.body;

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

    const access_token = createJWT(foundUser);
    const refresh_token = createRefreshJWT(foundUser);
    res.status(200).json({
      message: "User Authentication Successfull",
      user: foundUser,
      token: {access_token, refresh_token},
    });
  } catch (err) {
    next(
      ApiError.internalServerError(
        "DB Query Error or Error in decrypting password"
      )
    );
  }
  next();
};

module.exports = login;