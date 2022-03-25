const Portfolio = require("../../models/portfolio/portfolioSchema");
const ApiError = require("../../error/ApiError");

const deletePortfolio = async (req, res, next) => {
  res.send("Delete Portfolio Added");
};

module.exports = deletePortfolio;
