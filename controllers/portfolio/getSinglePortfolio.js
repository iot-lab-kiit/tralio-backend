const Portfolio = require("../../models/portfolio/portfolioSchema");
const ApiError = require("../../error/ApiError");

const getSinglePortfolio = async(req, res, next) => {
    try {
        const portfolioId = req.params.id;

        const portfolio = await Portfolio.findOne({ _id: portfolioId });

        if (!portfolio) {
            next(ApiError.notFound("Portfolio with current id not found"));
            return;
        }
        res.status(200).json({ portfolio: portfolio });
    } catch (err) {
        next(ApiError.internalServerError("Error in searching for user"));
        return;
    }
};

module.exports = getSinglePortfolio;