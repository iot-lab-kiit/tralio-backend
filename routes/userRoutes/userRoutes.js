const express = require("express");
const routes = express.Router();
const refreshJWT = require("../../helpers/refreshJWT");
const UserController = require("../../controllers/users/userController");
const validateCreateUserPayload = require("../../middlewares/userMiddlewares/validateCreateUserPayload");
const {verifyToken, verifyRefreshToken} = require('../../middlewares/auth')
routes.post("/register", validateCreateUserPayload, UserController.register);

routes.post("/login", UserController.login);
routes.post("/refresh-token", verifyRefreshToken, refreshJWT);
routes.get("/:id", UserController.userById);
routes.get("/all-users", UserController.getAllUser);
routes.delete("/:id", UserController.deleteUser);
routes.get("/:id/posts", UserController.getPostsByUser);

module.exports = routes;