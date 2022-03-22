const Post = require("../../models/post/postSchema");
const ApiError = require("../../error/ApiError");

const editPost = async (req, res, next) => {
  const { id: postId } = req.params;

  const post = await Post.findOneAndUpdate({ _id: postId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!post) {
    next(ApiError.notFound(`No post with id : ${postId}`));
    return;
  }

  res.status(200).json({ post });
};

module.exports = editPost;
