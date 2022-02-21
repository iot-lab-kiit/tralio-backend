const express = require("express");
const routes = express.Router();
const refreshJWT = require("../../helpers/refreshJWT");
const UserController = require("../../controllers/users/userController");
const validateCreateUserPayload = require("../../middlewares/userMiddlewares/validateCreateUserPayload");

routes.post(
  "/register",
  validateCreateUserPayload,
  UserController.register,
  (err) => {
    console.log("Error in creating user");
  }
);

routes.post("/login", UserController.login, (err) => {
  console.log("Login error");
});

routes.post("/refresh-token", refreshJWT, (err) => {
  console.log("Token Refresh Error");
});

routes.get("/:id", UserController.userById, (err) => {
  console.log("Errorrrr");
});

routes.delete("/:id", UserController.deleteUser);

module.exports = routes;
