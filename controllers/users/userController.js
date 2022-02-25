const register = require("./register");
const login = require("./login");
const refreshJWT = require("../../helpers/refreshJWT");
const userById = require("./userById");
const deleteUser = require("./deleteUser");
const getAllUser = require("./getAllUser");
const getAllPostsById = require("./getAllPosts");

module.exports = {
  register,
  login,
  refreshJWT,
  userById,
  deleteUser,
  getAllUser,
  getAllPostsById,
};
