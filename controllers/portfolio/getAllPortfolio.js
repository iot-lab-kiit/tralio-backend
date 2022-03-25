const Portfolio = require("../../models/portfolio/portfolioSchema");
const ApiError = require("../../error/ApiError");

const getAllPortfolio = async (req, res, next) => {
  var portfolios;
  try {
    portfolios = await Portfolio.find({});
  } catch (err) {
    next(ApiError.internalServerError("Database Error"));
    return;
  }
  if (!portfolios) {
    next(ApiError.notFound("Portfolios not found"));
    return;
  }

  res.status(200).json({ portfolios, count: portfolios.length });
};

module.exports = getAllPortfolio;
