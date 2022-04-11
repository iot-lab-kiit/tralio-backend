const express = require("express");
const routes = express.Router();
const refreshJWT = require("../../helpers/refreshJWT");
const UserController = require("../../controllers/users/userController");
const validateCreateUserPayload = require("../../middlewares/userMiddlewares/validateCreateUserPayload");
const verifyOtp = require("../../middlewares/userMiddlewares/verifyOtp");

routes.post(
    "/register", [validateCreateUserPayload, verifyOtp],
    UserController.register
);
routes.post("/login", UserController.login);
routes.post("/refresh-token", refreshJWT);
routes.get("/user-by-id/:id", UserController.userById);
routes.patch("/edit-user/:id", UserController.editUser);
routes.get("/all-users", UserController.getAllUser);
routes.delete("/delete/:id", UserController.deleteUser);
routes.get("/post-by-user/:id/posts", UserController.getPostsByUser);

module.exports = routes;