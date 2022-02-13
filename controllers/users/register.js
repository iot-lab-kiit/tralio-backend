const User = require("../../models/user/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  const { username, userEmail } = req.body;

  if (!username || !email) {
    return res.status(400).json({
      message: "Either username or email is missing",
    });
  }

  var findUser = User.findOne({ $or: [{ username: username }, { userEmail: userEmail }] });
  console.log(findUser);

};
