const Portfolio = require("../../models/portfolio/portfolioSchema");
const ApiError = require("../../error/ApiError");

const updatePortfolio = async (req, res, next) => {
  res.send("Update Portfolio Added");
};

module.exports = updatePortfolio;
