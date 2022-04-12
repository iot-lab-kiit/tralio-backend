const express = require("express");
const postController = require("../../controllers/posts/postController");
const postRoutes = express.Router();

postRoutes.post("/create", postController.createPost);
postRoutes.get("/all-posts", postController.getAllPost);
postRoutes.delete("/delete/:id", postController.deletePost);
postRoutes.patch("/edit-post/:id", postController.editPost);
postRoutes.get("/post-by-id/:id", postController.postById);

module.exports = postRoutes;