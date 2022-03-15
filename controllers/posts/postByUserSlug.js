const Post = require("../../models/post/postSchema");
const User= require('../../models/user/userSchema');
const ApiError = require("../../error/ApiError");

const postByUserSlug = async (req, res, next) => {
    try {
        const userName = req.query.username;
        const slug = req.query.slug;
        // const user = await User.findOne({username:userName})
        const posts = await Post.findOne({ username: userName, slug: slug });
        if (!posts) {
            next(ApiError.notFound("No Posts Found"));
        }
        res.status(200).json({ posts });
    } catch (err) {
        next(ApiError.internalServerError("Error in searching for user"));
    }
};

module.exports = postByUserSlug;