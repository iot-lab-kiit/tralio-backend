const ApiError = require("../../error/ApiError");
const Post = require("../../models/post/postSchema");

const getAllPosts = async (req, res, next) => {
  const userId = req.params.id;

  const posts = await Post.find({ postedBy: userId });
  if (!posts) {
    next(ApiError.notFound("No Posts Found"));
  }

  res.status(200).json({ posts });
};

module.exports = getAllPosts;
