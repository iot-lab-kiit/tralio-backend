const bcrypt = require("bcrypt");
const User = require("../../models/user/userSchema");
const createJWT = require("../../helpers/createJWT");

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

const refreshJWT = async(req, res) => {
  const token = createJWT(req.body)
  res.status(200).json({token:token, user:req.body})
}

module.exports = { login, refreshJWT };
