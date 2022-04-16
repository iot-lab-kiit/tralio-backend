const express = require("express");
const portfolioController = require("../../controllers/portfolio/portfolioController");
const Route = express.Router();

Route.get("/get-all-portfolio", portfolioController.getAllPortfolio); //need middleware to allow only admins to access this route
Route.get(
    "/get-single-portfolio",
    portfolioController.getSinglePortfolio
);
Route.delete("/delete-portfolio/:id", portfolioController.deletePortfolio);
Route.put("/register-and-update", portfolioController.portfolioHandler);

module.exports = Route;