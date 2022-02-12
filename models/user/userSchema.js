const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Please Provide a First Name"],
  },
  lastname: {
    type: String,
    required: [true, "Please Provide a Last Name"],
  },
  email: {
    type: String,
    required: [true, "Pleade Provide an email"],
  },
  password: {
    type: String,
    required: [true, "Please Provide a password"],
    minlength: 6,
  },
  userPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  likedPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comment",
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
