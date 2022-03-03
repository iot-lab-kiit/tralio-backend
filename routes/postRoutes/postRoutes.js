const express = require('express');
const postController = require('../../controllers/posts/postController');
const postRoutes = express.Router();


postRoutes.post('/create', postController.createPost);
postRoutes.get('/all-posts', postController.getAllPost);
postRoutes.get('/getPostByUserSlug', postController.postByUserSlug);
postRoutes.delete('/(:id)', postController.deletePost);
postRoutes.get('/:id',postController.postById );

module.exports = postRoutes;