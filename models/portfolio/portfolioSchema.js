const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Proide a name"],
  },
  email: {
    type: String,
    required: [true, "Please Proide an email"],
  },
  experience: {
    type: String,
    default: "I am a beginner",
  },
});

module.exports = mongoose.model("Portfolio", portfolioSchema);

//this is an example schema ... need front end team help to make proper schema.
