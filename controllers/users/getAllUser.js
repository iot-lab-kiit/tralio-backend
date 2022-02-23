const User = require("../../models/user/userSchema");
const userActivitySchema = require("../../models/user/userActivities");
const ApiError = require("../../error/ApiError");

const getAllUser = async (req, res, next) => {
  try {
    let allUser = await User.find({});
    if (!allUser) {
      next(ApiError.notFound("User not found"));
      return;
    }
    res.status(200).json({ message: "Sent all the available Users.", users: allUser });
  } catch (err) {
    next(ApiError.internalServerError("Error in searching for user"));
  }
  next();
};

module.exports = getAllUser;