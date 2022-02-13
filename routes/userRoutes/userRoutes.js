const express = require("express");
const routes = express.Router();
const UserController = require("../../controllers/users/userController");
const User = require("../../models/user/userSchema");


routes.post("/register", UserController.register, (err) => {
    console.log("Error in creating user : ", err);
});

// ToDo : change this from GET to POST
routes.get("/login", UserController.login, (err) => {
    console.log("Login error")
})


module.exports = routes;
