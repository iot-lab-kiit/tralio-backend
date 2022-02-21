const Post = require("../../models/post/postSchema")
const errorHandler= require("../../error/errorHandler")


const getAllPost = async (req, res) => {
    try {

        const allPost = await Post.find({});

        if (!allPost) {
            console.log("No post available in the Database")
            res.status(204).json({ msg: "No post found in the Database" });
        }
        res.status(200).json({ allPost });
    } catch (err) {
        console.log(err);
        res.status(400).json({
          message: "Error in searching for user",
          error: err,
        });
    }
}


module.exports = {
    getAllPost
};