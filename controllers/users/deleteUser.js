const User = require("../../models/user/userSchema");
const ApiError = require("../../error/ApiError");

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByIdAndDelete({ userId });
    if (!user) {
      next(ApiError.badRequest(`No User with id ${userId} exists`));
      next();
    }
    res.status(200).json({ message: "User deleted successfully", user: user });
  } catch (err) {
    next(ApiError.internalServerError("Error in deleting user"));
    return;
  }
  next();
};

module.exports = deleteUser;
