const jwt = require("jsonwebtoken");

const createJWT = (user) => {
  console.log(process.env.JWT_SECRET);
  return jwt.sign(
    { _id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};
module.exports = createJWT;
