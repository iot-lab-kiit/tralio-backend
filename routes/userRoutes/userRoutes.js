const express = require("express");
const routes = express.Router();
const refreshJWT = require("../../helpers/refreshJWT");
const UserController = require("../../controllers/users/userController");
const validateCreateUserPayload = require("../../middlewares/userMiddlewares/validateCreateUserPayload");

routes.post("/register", UserController.register);

routes.post("/login", UserController.login);
routes.post("/refresh-token", refreshJWT);
routes.get("/user-by-id/:id", UserController.userById);
routes.get("/all-users", UserController.getAllUser);
routes.delete("/:id", UserController.deleteUser);
routes.get("/post-by-user/:id/posts", UserController.getPostsByUser);

module.exports = routes;
