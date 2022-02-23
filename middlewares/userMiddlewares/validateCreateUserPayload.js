const User = require("../../models/user/userSchema")
const ApiError = require("../../error/ApiError");

const validateCreateUserPayload = async (req, res, next) => {
  const { username, userEmail, userPassword } = req.body;
  if (!username || !userEmail || !userPassword) {
    next(ApiError.badRequest("Required data for registration is missing"));
    return;
  }
  try {
    const findUser = await User.findOne({
      $or: [{ username: username }, { userEmail: userEmail }],
    }).then();

    // if below error is thrown, then user is not found
    // If it throws unnecessarily then check await is is there or not in findUser
    if (findUser != null) {
      next(ApiError.conflict("User already exists"));
      return;
    }
  } catch (err) {
    next(ApiError.internalServerError("Database Query Error"));
    return;
  }
  next();
};

module.exports = validateCreateUserPayload;