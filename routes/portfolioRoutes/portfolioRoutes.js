const express = require("express");
const portfolioController = require("../../controllers/portfolio/portfolioController");
const Route = express.Router();

Route.route("/register").post(portfolioController.createPortfolio);
Route.route("/get-all-portfolio").get(portfolioController.getAllPortfolio); //need middleware to allow only admins to access this route
Route.route("/get-single-portfolio/:id").get(
  portfolioController.getSinglePortfolio
); //need middleware to allow only admins and the user to access this route
Route.route("/update-portfolio/:id").post(portfolioController.updatePortfolio);
Route.route("/delete-portfolio/:id").post(portfolioController.deletePortfolio);

module.exports = Route;
