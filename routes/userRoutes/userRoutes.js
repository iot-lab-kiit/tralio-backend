const express = require("express");
const routes = express.Router();
const { login, register } = require("../../controllers/users/register");

routes.post("/register", register);
routes.post("/login", login);

module.exports = routes;
