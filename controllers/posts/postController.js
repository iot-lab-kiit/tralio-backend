const createPost = require('./post');
const getAllPost = require('./getAllPost')
const deletePost = require("./deletePostByID")
const postById = require('./postById')
const postEdit = require('./postEdit')
module.exports = {createPost, getAllPost, deletePost,postById,postEdit};
