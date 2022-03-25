const Portfolio = require("../../models/portfolio/portfolioSchema");
const ApiError = require("../../error/ApiError");

const getSinglePortfolio = async (req, res) => {
  res.send("Get Single Portfolio Added");
};

module.exports = getSinglePortfolio;
