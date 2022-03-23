const express = require("express");
const Route = express.Router();

const auth = require("../../controllers/authentication");

Route.route("/send-email").get(auth.sendMail);
Route.post("/verify-email", auth.verifyMail);

module.exports = Route;
