const bcrypt = require("bcrypt");
const User = require("../../models/user/userSchema");
const createJWT = require("../../helpers/createJWT");
const ApiError = require("../../error/ApiError");

const login = async (req, res, next) => {
  const { username, userEmail, userPassword } = req.body;

  // Todo : Need error handling for mongo query
  const foundUser = await User.findOne({ username: username });
  if (!foundUser) foundUser = await User.findOne({ userEmail: userEmail });

  if (!foundUser) {
    next(ApiError.notFound("User not found"));
    return;
  }

  // Todo : Need error handling for bcrypt
  const validPassword = await bcrypt.compare(
    userPassword,
    foundUser.userPassword
  );

  if (!validPassword) {
    next(ApiError.badRequest("Invalid Password"));
    return;
  }

  const token = createJWT(foundUser);
  res.status(200).json({
    message: "User AUthentication Successfull",
    user: foundUser,
    token: token,
  });

  next();
};

module.exports = { login};
