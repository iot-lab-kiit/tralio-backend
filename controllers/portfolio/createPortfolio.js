const Portfolio = require("../../models/portfolio/portfolioSchema");
const ApiError = require("../../error/ApiError");

const create = async(req, res, next) => {
    const portfolioData = req.body;
    if (!portfolioData) {
        next(ApiError.badRequest("Please Enter Details"));
        return;
    }

    // if (!portfolioData.name || !portfolioData.email) {
    //   next(ApiError.badRequest("Please Enter Data for All Fields"));
    //   return;
    // }
    var portfolio;
    try {
        portfolio = await Portfolio.create(portfolioData);
    } catch (err) {
        next(ApiError.internalServerError("Database Error"));
        return;
    }
    console.log(portfolio);
    res.status(201).json(portfolio);
};

module.exports = create;