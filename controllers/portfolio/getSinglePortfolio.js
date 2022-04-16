const Portfolio = require("../../models/portfolio/portfolioSchema");
const ApiError = require("../../error/ApiError");
const User = require("../../models/user/userSchema");

const getSinglePortfolio = async(req, res, next) => {
    try {
        
        const username = req.query.username;
        const userData = await User.findOne({ username: username });
        const portfolio = await Portfolio.findOne({ postedBy: userData._id });

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