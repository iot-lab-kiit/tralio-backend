const Portfolio = require("../../models/portfolio/portfolioSchema");
const ApiError = require("../../error/ApiError");

const getAllPortfolio = async (req, res) => {
  res.send("Get All Portfolio");
};

module.exports = getAllPortfolio;
