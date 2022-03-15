const Post = require("../../models/post/postSchema");
const ApiError = require("../../error/ApiError");

const postEdit = async(req,res,next)=>{



    const { id: postId } = req.params

    const post = await Post.findOneAndUpdate({ _id: postId }, req.body, {
      new: true,
      runValidators: true,
    })
  
    if (!post) {
      return next(ApiError(`No post with id : ${postId}`, 404))
    }
  
    res.status(200).json({ post })

}

module.exports={
    postEdit
}
