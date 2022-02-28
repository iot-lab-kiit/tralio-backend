const User = require("../../models/user/userSchema");
const ApiError = require("../../error/ApiError");

const updateUser = async (req, res, next) => {
  const { firstname, lastname, userDOB, userGender, userCountry, username } =
    req.body;
  if (!firstname || !lastname || !userDOB || !userGender || !userCountry) {
    next(ApiError.badRequest("Please provide all values"));
    return;
  }
  const user = await User.findOneAndUpdate(
    { _id: req.params.id },
    { firstname, lastname, userDOB, userGender, userCountry },
    { new: true, runValidators: true }
  );
  res.status(200).json({ user: user });
};

module.exports = updateUser;
