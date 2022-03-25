const Portfolio = require("../../models/portfolio/portfolioSchema");
const ApiError = require("../../error/ApiError");

const getAllPortfolio = async (req, res) => {
  var portfolios;
  try {
    portfolios = await Portfolio.find({});
  } catch (err) {
    next(ApiError.internalServerError("Database Error"));
  }
  if (!portfolios) {
    next(ApiError.notFound("Portfolios not found"));
  }

  res.status(200).json({ portfolios, count: portfolios.length });
};

module.exports = getAllPortfolio;
