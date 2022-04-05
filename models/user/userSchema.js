const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username Missing"],
    index: { unique: true, dropDups: true },
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
    index: { unique: true, dropDups: true },
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

  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

// userSchema.pre("save", async function () {
//   if (!this.isModified("password")) return;
//   const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
//   this.password = await bcrypt.hash(this.password, salt);
// });

userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

const User = mongoose.model("users", userSchema);

module.exports = User;
