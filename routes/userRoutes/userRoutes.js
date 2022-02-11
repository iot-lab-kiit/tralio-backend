const express = require("express");
const routes = express.Router();
const { login, register } = require("../../controllers/users/user");

routes.post("/register", register);
routes.post("/login", login);

module.exports = routes;
