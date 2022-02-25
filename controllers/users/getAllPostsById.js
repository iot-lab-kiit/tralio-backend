const ApiError = require("../../error/ApiError");
const Post = require("../../models/post/postSchema");

const getAllPostsById = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const posts = await Post.find({ postedBy: userId });
    if (!posts) {
      next(ApiError.notFound("No Posts Found"));
    }

    res.status(200).json({ posts });
  } catch (err) {
    next(ApiError.internalServerError("Error in searching for user"));
  }
};

module.exports = getAllPosts;
