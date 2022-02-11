const jwt = require("jsonwebtoken");

const createJWT = (user) => {
  return jwt.sign(
    { _id: user._id, name: user.firstName, email: user.email },
    process.env.SECRET_KEY,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};
module.exports = createJWT;
