const express = require("express");
const routes = express.Router();
const EmailController = require("../../controllers/email/EmailController");

routes.get("/send-otp", EmailController.sendOtp);
