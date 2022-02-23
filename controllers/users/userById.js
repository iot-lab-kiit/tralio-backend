const User = require("../../models/user/userSchema");
const userActivitySchema = require("../../models/user/userActivities");
const createJWT = require("../../helpers/createJWT");
const ApiError = require("../../error/ApiError");

const userById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    let singleUser = await User.findOne({ _id: userId });
    if (!singleUser) {
      next(ApiError.notFound("User not found"));
      return;
    }
    res.status(200).json({ user: singleUser });
  } catch (err) {
    next(ApiError.internalServerError("Error in searching for user"));
  }
};

module.exports = userById;
