const mongoose = require("mongoose");

const mailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },

  transactionId: {
    type: String,
    required: true,
  },

  otpCode: {
    type: Number,
    required: true,
  },

  expiresIn: {
    type: Date,
  },

  isVerified: {
    type: String,
    default: "false",
  },
});

module.exports = mongoose.model("TempData", mailSchema);
