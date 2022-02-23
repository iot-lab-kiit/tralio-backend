const Post = require("../../models/post/postSchema");
const ApiError = require("../../error/ApiError");
const mongoose = require('mongoose');
const deletePost = async (req, res, next) => 
{
  try 
  {
        const postID = req.params.id;
        console.log(postID)
        const post = await Post.findByIdAndDelete({_id:postID})
        if (!post) 
        {
            next(ApiError.badRequest(`No Post with ID ${postID} Found`));
            return;
        }

        return res.status(200).send(post);
    } 
   catch (error) 
    {
        return next(ApiError.internalServerError(error.message));
    }
};
module.exports = deletePost;