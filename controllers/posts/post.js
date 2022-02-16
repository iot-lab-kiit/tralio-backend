const Post = require("../../models/post/postSchema");
const User = require("../../models/user/userSchema");

const create_post = async (req, res) => {
  try {
    const { slug, title, content, username } = req.body;
    const postPayload = req.body;

    const foundUser = await User.findOne({ username: username });
    if (foundUser) {
      postPayload.postedBy = foundUser._id;
      if (!slug || !title || !content) {
        return res.status(400).json({
          error: "missing required content",
        });
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
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

module.exports = create_post;