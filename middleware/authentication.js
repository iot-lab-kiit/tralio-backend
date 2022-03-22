const ApiError = require("../error/ApiError");
const { isTokenValid, attachCookiesToResponse } = require("../utils");
const Token = require("../models/user/Token");

const authenticateUser = async (req, res, next) => {
  const { refreshToken, accessToken } = req.signedCookies;

  try {
    if (accessToken) {
      const payload = isTokenValid(accessToken);
      req.user = payload.user;
      return next();
    }

    const payload = isTokenValid(refreshToken);

    const existingToken = await Token.findOne({
      user: payload.user.userId,
      refreshToken: payload.refreshToken,
    });

    if (!existingToken || !existingToken?.isValid) {
      next(ApiError.forbidden("Authentication Invalid"));
    }

    attachCookiesToResponse({
      res,
      user: payload.user,
      refreshToken: existingToken.refreshToken,
    });
    req.user = payload.user;
    next();
  } catch (error) {
    next(ApiError.forbidden("Authentication Invalid"));
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      next(ApiError.forbidden("Access not Allowed to this route"));
    }
    next();
  };
};

module.exports = {
  authenticateUser,
  authorizePermissions,
};
