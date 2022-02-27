const Post = require("../../models/post/postSchema");
const ApiError = require("../../error/ApiError");

const postById = async (req, res, next) => {
  try {
    const postId = req.params.id;
    let singlePost = await Post.findOne({ _id: postId });
    if (!singlePost) {
      next(ApiError.notFound("Post not found"));
      return;
    }
    res.status(200).json({ user: singlePost });
  } catch (err) {
    next(ApiError.internalServerError("Error in searching for Post"));
  }
};

module.exports = postById;
