const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    postedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please Provide Which User Posted This Post"],
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: [true, "Please Provide a description"],
    },
    likesCount: {
      type: Number,
      default: 0,
    },
    likedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
