const express = require('express');
const postController = require('../../controllers/posts/postController');
const postRoutes = express.Router();


postRoutes.post('/create', postController.createPost);
postRoutes.get('/all-posts', postController.getAllPost);
postRoutes.delete('/:id', postController.deletePost);
postRoutes.get('id/:id',postController.postById );
postRoutes.get('/getPostByUserSlug', postController.postByUserSlug);

module.exports = postRoutes;