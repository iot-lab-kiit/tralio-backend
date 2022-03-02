const createPost = require('./post');
const getAllPost = require('./getAllPost')
const deletePost = require("./deletePostByID")
const postById = require('./postById')
const editPost = require('./editPost')
module.exports = {createPost, getAllPost, deletePost,postById,editPost};
