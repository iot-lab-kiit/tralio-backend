//Remove this file if u feel like..meko individual request m activities integrate krna sahi lga...i'm always ready to discuss in a scheduled meet...lots of love xD Harsh ^-^
const mongoose = require("mongoose");
const ApiError = require("../../error/ApiError");
const Activities = require("../../models/user/userActivities");
const { default: mongoose } = require( "mongoose" );

const getRecentPost = async (_, res, next) => 
{
    try {
    //   const rPost = await Activities.find().sort({ _id: -1 }).limit(3)
      const rPost = await Activities.find({userPosts}).sort({ updatedAt: 'desc'}).exec().limit(3);
      if (!rPost) {
        next(ApiError.notFound("No Post Exists"));
        return;
      }
      res.status(200).json({ message: "Sent the last 3 posts.", recentPosts: rPost });
    } catch (err) {
      next(ApiError.internalServerError("Database Query Error."));
    }
    next();
  };

const getRecentComments = async (_, res, next) => 
{
    try 
    {
      // const rComments = await Activities.find().sort({ _id: -1 }).limit(3)
      const rLikes = await Activities.find({likedPosts}).sort({ updatedAt: 'desc'}).exec().limit(3);
      if (!rComments) {
          next(ApiError.notFound("No Comment Exists"));
          return;
      }
      res.status(200).json({ message: "Sent the last 3 Comments.", recentComments: rComments });
      }
       catch (err) {
      next(ApiError.internalServerError("Database Query Error."));
    }
      next();
};

const getRecentLikedPost = async (_, res, next) => 
{
    try {
    //   const rLikes = await Activities.find().sort({ _id: -1 }).limit(3)
      const rLikes = await Activities.find({comments}).sort({ updatedAt: 'desc'}).exec().limit(3);
      if (!rLikes) {
        next(ApiError.notFound("No Post Exists"));
        return;
      }
      res.status(200).json({ message: "Sent the last 3 Liked Posts.", recentLikes: rLikes });
    } catch (err) {
      next(ApiError.internalServerError("Database Query Error."));
    }
    next();
  };

module.exports = {getRecentComments,getRecentLikedPost,getRecentPost};