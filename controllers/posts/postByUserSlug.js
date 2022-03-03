// Write your code for the postByUserSlug controller here.
// Check for any problem in the code and fix it.
const Post = require("../../models/post/postSchema");
const User = require("../../models/user/userSchema");
const ApiError = require("../../error/ApiError");

const postByUserSlug = async (req, res, next) => {
    try {
        const username = req.params.username;
        const slug = req.params.slug;
        const posts = await Post.find({ postedBy: userId, slug: slug });
        if (!posts) {
            next(ApiError.notFound("No Posts Found"));
        }
        res.status(200).json({ posts });
    } catch (err) {
        next(ApiError.internalServerError("Error in searching for user"));
    }
};

module.exports = postByUserSlug;

