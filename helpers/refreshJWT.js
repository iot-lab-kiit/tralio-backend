const createJWT = require("./createJWT");

const refreshJWT = async (req, res) => {
  const token = createJWT(req.body);
  res.status(200).json({ token: token, user: req.body });
};

module.exports = refreshJWT;