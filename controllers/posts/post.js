const Post = require("../../models/post/postSchema");
const User = require("../../models/user/userSchema");
const ApiError = require("../../error/ApiError");

const createPost = async (req, res, next) => {
  try {
    const { slug, title, content, username } = req.body;
    const postPayload = req.body;

    const foundUser = await User.findOne({ username: username });
    if (foundUser) {
      postPayload.postedBy = foundUser._id;
      if (!slug || !title || !content) {
        next(ApiError.badRequest("Missing required content."));
        return;
      } else {
        const newPost = await new Post(postPayload);
        newPost.save().then((post) => {
          return res.status(200).json({
            message: "Post create sucessfully",
            post: post,
          });
        });
        next();
      }
    } else {
      return next(ApiError.notFound("User not found"));
    }
  } catch (err) {
    return next(ApiError.internalServerError("Database query error"));
  }
};

module.exports = createPost;
