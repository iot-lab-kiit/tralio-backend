const Portfolio = require("../../models/portfolio/portfolioSchema");
const ApiError = require("../../error/ApiError");

const updatePortfolio = async (req, res, next) => {
  const { id: portfolioId } = req.params;
  try {
    const portfolio = await Portfolio.findOneAndUpdate(
      { _id: portfolioId },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!portfolio) {
      next(ApiError.notFound(`No portfolio with id : ${portfolioId}`));
      return;
    }

    res.status(200).json({ portfolio });
  } catch (err) {
    next(ApiError.internalServerError("Error in searching for portfolio"));
    return;
  }
};

module.exports = updatePortfolio;
