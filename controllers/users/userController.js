const register = require("./register");
const login = require("./login");
const refreshJWT = require("../../helpers/refreshJWT");
const userById = require("./userById");
const deleteUser = require("./deleteUser");
const getAllUser = require("./getAllUser");
const getPostsByUser = require("./getPostsByUser");
const recentPost=require("./getActivities/recentPosts")
const recentComments=require("./getActivities/recentComments")
const recentLikes=require("./getActivities/recentLikes")

module.exports = {
  register,
  login,
  refreshJWT,
  userById,
  deleteUser,
  getAllUser,
  getPostsByUser,
  recentPost,
  recentComments,
  recentLikes
};
