const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: [true, "slug missing"],
    },
    title: {
      type: String,
      required: [true, "title missing"],
    },
    caption: {
      type: String,
      required: false,
    },
    content: {
      type: String,
      required: [true, "Content missing"],
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
        ref: "Comments",
      },
    ],
    
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author missing"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
