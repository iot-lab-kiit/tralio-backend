const jwt = require("jsonwebtoken");
const redis_client = require('../redis_connect');

const createJWT = (user) => {
  return jwt.sign(
    { _id: user._id, email: user.email },
    process.env.SECRET_KEY,
    { expiresIn: process.env.JWT_ACCESS_LIFETIME }
  );
};

const createRefreshJWT = (user) => {
  const refresh_token =  jwt.sign(
    { _id: user._id, email: user.email },
    process.env.REFRESH_SECRET_KEY,
    { expiresIn: process.env.JWT_REFRESH_LIFETIME }
  );
  
  // If value exist it will update and if not then will add it
  redis_client.set(user._id.toString(), refresh_token);
  return refresh_token;
};
module.exports = { createJWT, createRefreshJWT };
