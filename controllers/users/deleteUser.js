const User = require("../../models/user/userSchema");
const ApiError = require("../../error/ApiError");

const deleteUser = async (req, res) => {
  const userId = req.params.id;

  const user = await User.findByIdAndDelete({ userId });
  if (!user) {
    next(ApiError.badRequest(`No User with id ${userId} exists`));
  }
  res.status(200).send(user);
};
module.exports = deleteUser;
