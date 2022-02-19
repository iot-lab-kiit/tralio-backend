const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username Missing"],
    index: {unique: true, dropDups: true}
  },
  firstname: {
    type: String,
    required: [true, "First Name Missing"],
  },
  lastname: {
    type: String,
    required: [true, "Last Name Missing"],
  },
  userEmail: {
    type: String,
    required: [true, "Email Missing"],
    index: {unique: true, dropDups: true}
  },
  userPassword: {
    type: String,
    required: [true, "Password Misssing"],
    minlength: 6,
  },
  userDOB: {
    type: String,
  },
  userGender: {
    type: String,
    required: [true, "Gender Missing"],
  },
  userCountry: {
    type: String,
  },
  
});

const User = mongoose.model("User", userSchema);

module.exports = User;
