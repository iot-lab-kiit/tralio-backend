const express = require("express");
const portfolioController = require("../../controllers/portfolio/portfolioController");
const Route = express.Router();

Route.route("/register").post(portfolioController.createPortfolio);
Route.route("/get-all-portfolio").get(portfolioController.getAllPortfolio); //need middleware to allow only admins to access this route

module.exports = Route;
