const mongoose = require("mongoose");
const ApiError = require("../../error/ApiError");
const Activities = require("../../models/user/userActivities");
const { default: mongoose } = require( "mongoose" );
const getRecentComments = async (_, res, next) => 
{
    try {
    // const rComments = await Activities.find().sort({ _id: -1 }).limit(3)
    const rComments = await Activities.find({comments}).sort({ updatedAt: 'desc'}).exec().limit(3);
    if (!rComments) {
        next(ApiError.notFound("No Comment Exists"));
        return;
    }
    res.status(200).json({ message: "Sent the last 3 Comments.", recentComments: rComments });
    } catch (err) {
    next(ApiError.internalServerError("Database Query Error."));
    }
    next();
};
module.exports = {getRecentComments};