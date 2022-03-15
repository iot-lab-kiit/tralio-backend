//Remove this file if u feel like..meko individual request m activities integrate krna sahi lga...i'm always ready to discuss in a scheduled meet...lots of love xD Harsh ^-^
const ApiError = require("../../error/ApiError");
const Posts = require("../../models/post/postSchema");
const User = require("../../models/user/userSchema");
const Comments= require("../../models/comments/comment");
const { default: mongoose } = require( "mongoose" );

const getRecentPost = async (req, res, next) => 
{
    try {
    //   const recentPost = await Activities.find().sort({ _id: -1 }).limit(3)
      const username = req.params.username;
      const recentPost = await Post.find({postedBy:'username'}).sort({ updatedAt: 'desc'}).exec().limit(10);
      if (!recentPost) {
        next(ApiError.notFound("No Post Exists"));
        return;
      }
      res.status(200).json({ message: "Sent the last 10 posts.", recentPosts: recentPost });
    } catch (err) {
      next(ApiError.internalServerError("Database Query Error."));
    }
    next();
  };

const getRecentComments = async (req, res, next) => 
{
    try 
    {
      // const rComments = await Activities.find().sort({ _id: -1 }).limit(3)
      const username = req.params.username;
      const recentComments = await Comments.find({postedBy:'username'}).sort({ updatedAt: 'desc'}).exec().limit(10);
      if (!recentComments) {
          next(ApiError.notFound("No Comment Exists"));
          return;
      }
      res.status(200).json({ message: "Sent the last 10 Comments.", recentComments: recentComments });
      }
       catch (err) {
      next(ApiError.internalServerError("Database Query Error."));
    }
      next();
};

// const getRecentLikedPost = async (_, res, next) => 
// {
//     try {
//     //   const rLikes = await Activities.find().sort({ _id: -1 }).limit(3)
//       const rLikes = await Activities.find({comments}).sort({ updatedAt: 'desc'}).exec().limit(3);
//       if (!rLikes) {
//         next(ApiError.notFound("No Post Exists"));
//         return;
//       }
//       res.status(200).json({ message: "Sent the last 3 Liked Posts.", recentLikes: rLikes });
//     } catch (err) {
//       next(ApiError.internalServerError("Database Query Error."));
//     }
//     next();
//   };

module.exports = {getRecentComments,getRecentPost};