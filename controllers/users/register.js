const User = require("../../models/user/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const createJWT = require("../../helpers/jwtHandler")

const register = async (req, res) => {
  const { username, userEmail } = req.body;
  const userPayload = req.body; 

  if (!username || !userEmail) {
    res.status(400).json({
      message: "Either username or email is missing",
    });
    return;
  }

  var findUser = User.findOne({
    $or: [{ username: username }, { userEmail: userEmail }],
  });
  findUser.then(async (user) => {
    if (user) {
      res.status(400).json({
        message: "User already exists",
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      userPayload.password = await bcrypt.hash(userPayload.password, salt);
      const newUser = new User(userPayload);
      newUser
        .save()
        .then((user) => {
          const token = createJWT(user);
          res.status(201).json({
            message: "User created successfully",
            user: user,
            token: token,
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json({
            message: "Error in creating user",
            error: err,
          });
        });
    }
  });
};

module.exports = {register};
