const ApiError = require("../error/ApiError");

const checkPermissions = (requestUser, resourceUserId, next) => {
  if (requestUser.role === "admin") return;
  if (requestUser.userId === resourceUserId.toString()) return;

  next(
    ApiError.unauthorized(
      "This User Does not have the necessary Roles to access this route"
    )
  );
};

module.exports = checkPermissions;
