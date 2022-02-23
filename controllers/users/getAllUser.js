const User = require("../../models/user/userSchema");
const ApiError = require("../../error/ApiError");

const getAllUser = async (_, res, next) => {
  try {
    const allUser = await User.find({});
    if (!allUser) {
      next(ApiError.notFound("User not found"));
      return;
    }
    res.status(200).json({ message: "Sent all the available Users.", users: allUser });
  } catch (err) {
    next(ApiError.internalServerError("Database Query Error."));
  }
  next();
};

module.exports = getAllUser;