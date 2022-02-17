const {register} = require("./register")
const {login, refreshJWT} = require("./login")
const {userById} = require ("./userById")

module.exports = {
  register,
  login,
  refreshJWT,
  userById
}