const Post = require("../../models/post/postSchema");
const User = require("../../models/user/userSchema");
const ApiError = require("../../error/ApiError");

const create_post = async (req, res, next) => {
  try {
    const { slug, title, content, username } = req.body;
    const postPayload = req.body;

    const foundUser = await User.findOne({ username: username });
    if (foundUser) {
      postPayload.postedBy = foundUser._id;
      if (!slug || !title || !content) {
        return next(ApiError.badRequest("missing required content"));
      } else {
        const newPost = await new Post(postPayload);
        newPost.save().then((post) => {
          return res.status(200).json({
            message: "Post create sucessfully",
            data: post,
          });
        });
      }
    } else {
      return next(ApiError.notFound("User not found"));
    }
  } catch (error) {
    return next(ApiError.internalServerError(error.message));
  }
};

module.exports = create_post;
