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
  
module.exports = {getRecentPost};