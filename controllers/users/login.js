const bcrypt = require("bcrypt");
const User = require("../../models/user/userSchema");
const createJWT = require("../../helpers/jwtHandler");

const login = async (req, res) => {
  const { username, userEmail, userPassword } = req.body;

   // Todo : Need error handling for mongo query
  const foundUser = await User.findOne({ username: username });
  if (!foundUser) foundUser = await User.findOne({ userEmail: userEmail });

  if (!foundUser) {
    res.status(404).json({ message: "User not found" });
  } else {

    // Todo : Need error handling for bcrypt
    const validPassword = await bcrypt.compare(
      userPassword,
      foundUser.userPassword
    );
    if (validPassword) {
      const token = createJWT(foundUser)
      res.status(200).json({ message: "User AUthentication Successfull", user: foundUser, token: token});
    } else {
      res.status(400).json({ error: "Invalid Password" });
    }
  }
};

module.exports = { login };
