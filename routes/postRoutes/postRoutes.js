const express = require('express');
const postController = require('../../controllers/posts/postController');
const postRoutes = express.Router();


postRoutes.post('/create', postController.createPost);
postRoutes.get('/all-posts', postController.getAllPost);



module.exports = postRoutes;