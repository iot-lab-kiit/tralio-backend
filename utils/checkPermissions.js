const ApiError = require("../../error/ApiError");

const checkPermissions = (requestUser, resourceUserId) => {
  if (requestUser.role === "admin") return;
  if (requestUser.userId === resourceUserId.toString()) return;
  next(ApiError.unauthorized("You do not have the role to access this route."));
};

module.exports = checkPermissions;
