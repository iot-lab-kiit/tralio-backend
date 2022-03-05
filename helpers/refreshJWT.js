const { createJWT, createRefreshJWT } = require("./createJWT");
const ApiError = require('../error/ApiError')

const refreshJWT = async (req, res, next) => {
  try {
    // generate new access and refresh token
    const user = req.user;
    const access_token = createJWT(user);
    const refresh_token = createRefreshJWT(user);
    res.status(200).json({
      message: "successfully refreshed token",
      token: { access_token, refresh_token },
    });
    next();
  } catch (error) {
    next(ApiError.internalServerError("Cannot refresh token"))
  }
};

module.exports = refreshJWT;
