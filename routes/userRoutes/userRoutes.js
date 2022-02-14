const express = require("express");
const routes = express.Router();
const UserController = require("../../controllers/users/userController");
const User = require("../../models/user/userSchema");


routes.post("/register", UserController.register, (err) => {
    console.log("Error in creating user : ", err);
});

routes.post("/login", UserController.login, (err) => {
    console.log("Login error")
})


module.exports = routes;
