const Post = require("../../models/post/postSchema");
const ApiError = require("../../error/ApiError");

const getAllPost = async (_, res, next) => {
  try {
    const allPost = await Post.find({});
    if (!allPost) {
      next(ApiError.notFound("Post not found"));
      return;
    }
    res.status(200).json({ allPost: allPost });
  } catch (err) {
    next(ApiError.internalServerError("Database Query Error."));
  }
};

module.exports = getAllPost;
