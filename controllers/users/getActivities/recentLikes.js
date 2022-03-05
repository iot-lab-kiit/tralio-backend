const mongoose = require("mongoose");
const ApiError = require("../../error/ApiError");
const Activities = require("../../models/user/userActivities");
const { default: mongoose } = require( "mongoose" );
const getRecentLikedPost = async (_, res, next) => 
{
    try {
    //   const rLikes = await Activities.find().sort({ _id: -1 }).limit(3)
      const rLikes = await Activities.find({likedPosts}).sort({ updatedAt: 'desc'}).exec().limit(3);
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

    
module.exports = {getRecentLikedPost};