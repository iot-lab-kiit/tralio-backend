const {register} = require("./register")
const {login, refreshJWT} = require("./login")

module.exports = {
  register,
  login,
  refreshJWT
}