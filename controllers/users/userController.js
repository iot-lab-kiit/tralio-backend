const register = require("./register");
const login = require("./login");
const refreshJWT = require("../../helpers/refreshJWT");
const userById = require("./userById");
const deleteUser = require("./deleteUser");
const getAllUser = require("./getAllUser");
const getPostsByUser = require("./getPostsByUser");
const getActivitiesOfUser=require("./getActivitiesOfUser");


module.exports = {
  register,
  login,
  refreshJWT,
  userById,
  deleteUser,
  getAllUser,
  getPostsByUser,
  getActivitiesOfUser
};
