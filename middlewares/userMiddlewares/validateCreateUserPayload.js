const User = require("../../models/user/userSchema")
const ApiError = require("../../error/ApiError");

const validateCreateUserPayload = (req, res, next) => {
  const { username, userEmail, userPassword } = req.body;
  if (!username || !userEmail || !userPassword) {
    next(ApiError.badRequest("Either username or email is missing"));
    return;
  }
  try {
    const findUser = User.findOne({
      $or: [{ username: username }, { userEmail: userEmail }],
    }).then();
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