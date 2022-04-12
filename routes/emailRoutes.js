const express = require("express");
const emailRoutes = express.Router();
const EmailController = require("../controllers/email/emailController");

emailRoutes.get("/send-otp", EmailController.sendOtp);

module.exports = emailRoutes;