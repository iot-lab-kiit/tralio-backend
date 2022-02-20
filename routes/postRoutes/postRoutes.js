const express = require('express');
const postController = require('../../controllers/posts/postController');
const postRoutes = express.Router();

postRoutes.post('/create', postController.create_post, (error)=>{
    console.log(error);
})
postRoutes.get('/post',postController.getAllPost.getAllPost,(error)=>{
    console.log(error);
})

module.exports = postRoutes;