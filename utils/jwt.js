const jwt = require("jsonwebtoken");

//jwt token creator function

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};

//jwt token verify function

const isTokenValid = (token) => jwt.verify(token, process.env.JWT_SECRET);

//sending cookies to the browser

const attachCookiesToResponse = ({ res, user, refreshToken }) => {
  const accessTokenJWT = createJWT({ payload: { user } });
  const refreshTokenJWT = createJWT({ payload: { user, refreshToken } });

  const oneMonth = 1000 * 60 * 60 * 24 * 30;
  const oneSecond = 1000;

  //attaching cookie for accessToken with lifetime of 1 sec

  res.cookie("accessToken", accessTokenJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(Date.now() + oneSecond),
    signed: true,
  });

  //attaching cookie for refreshToken with lifetime of 1 sec

  res.cookie("refreshToken", refreshTokenJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(Date.now() + oneMonth),
    signed: true,
  });
};

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
};
