const Portfolio = require("../../models/portfolio/portfolioSchema");
const ApiError = require("../../error/ApiError");

const create = async (req, res) => {
  const portfolioData = req.body;

  if (!portfolioData) {
    next(ApiError.badRequest("Please Enter Details"));
  }

  if (!portfolioData.name || !portfolioData.email) {
    next(ApiError.badRequest("Please Enter Data for All Fields"));
  }

  const portfolio = await Portfolio.create(portfolioData);

  if (!portfolio) {
    next(ApiError.internalServerError("Database Error"));
  }

  res.status(201).json(portfolio);
};

module.exports = create;
