const ApiError = require("../../error/ApiError");

const validateCreateUserPayload = async (req, res, next) => {
  const { username, userEmail, userPassword } = req.body;
  if (!username || !userEmail || !userPassword) {
    next(ApiError.badRequest("Required data for registration is missing"));
    return;
  }
  next();
};

module.exports = validateCreateUserPayload;