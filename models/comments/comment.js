const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please Provide User"],
    },
    content: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("comment", commentSchema);
