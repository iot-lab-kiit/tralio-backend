const express = require("express");
const portfolioController = require("../../controllers/portfolio/portfolioController");
const Route = express.Router();

Route.route("/register").post(portfolioController.createPortfolio);

module.exports = Route;
