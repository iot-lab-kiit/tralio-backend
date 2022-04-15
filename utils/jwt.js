const jwt = require("jsonwebtoken");

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};

const isTokenValid = (token) => jwt.verify(token, process.env.JWT_SECRET);

const attachCookiesToResponse = ({ res, user }) => {
  const accessTokenJWT = createJWT({ payload: { user } });
  const refreshTokenJWT = createJWT({ payload: { user } });

  const oneMonth = 1000 * 60 * 60 * 24 * 30;
  const oneSecond = 1000 * 60 * 15;

  res.cookie("accessToken", accessTokenJWT, {
    signed: true,
    httpOnly: true,
    maxAge: new Date(Date.now() + oneSecond),
  });
  res.cookie("refreshToken", refreshTokenJWT, {
    signed: true,
    httpOnly: true,
    maxAge: new Date(Date.now() + oneMonth),
  });

  return accessTokenJWT;
};

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
};
