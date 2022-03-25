const Portfolio = require("../../models/portfolio/portfolioSchema");
const ApiError = require("../../error/ApiError");

const deletePortfolio = async (req, res, next) => {
  try {
    const portfolioId = req.params.id;

    const portfolio = await Portfolio.findByIdAndDelete({ _id: portfolioId });
    if (!portfolio) {
      next(ApiError.badRequest(`No Post with ID ${portfolioId} Found`));
      return;
    }

    return res.status(200).send(portfolio);
  } catch (error) {
    return next(ApiError.internalServerError(error.message));
  }
};

module.exports = deletePortfolio;
