const register = require("./register");
const login = require("./login");
const refreshJWT = require("../../helpers/refreshJWT");
const userById = require("./userById");
const deleteUser = require("./deleteUser");
const getAllUser = require("./getAllUser");
const getPostsByUser = require("./getPostsByUser");
const editUser = require("./editUser");

module.exports = {
    register,
    login,
    refreshJWT,
    editUser,
    userById,
    deleteUser,
    getAllUser,
    getPostsByUser,
};