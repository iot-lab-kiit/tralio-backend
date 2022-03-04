const createPost = require("./post");
const getAllPost = require("./getAllPost");
const deletePost = require("./deletePostByID");
const postById = require("./postById");
const postByUserSlug = require("./postByUserSlug");
module.exports = {
    createPost,
    getAllPost,
    deletePost,
    postById,
    postByUserSlug,
};
