const Portfolio = require("../../models/portfolio/portfolioSchema");
const ApiError = require("../../error/ApiError");
const User = require("../../models/user/userSchema");

const portfolioHandler = async(req, res, next) => {
    const userName = req.query.username;
    let portfolioData = req.body;
    try {
        const user = await User.findOne({ username: userName });
        if (!user) {
            next(ApiError.notFound("User Not Found!!"));
            return;
        }
        const userId = user._id;
        var portfolio = await Portfolio.findOne({ postedBy: userId });
        if (!portfolio) {
            portfolioData.postedBy = userId;
            const fullData = await new Portfolio(portfolioData);
            fullData.save().then((portfolio) => {
                res.status(200).json({
                    message: "Portfolio create successfully",
                    portfolio: portfolio,
                });
            });
            return;
        } else {
            const portfolioId = portfolio._id;
            portfolio = await Portfolio.findOneAndUpdate({ _id: portfolioId },
                req.body, {
                    new: true,
                    runValidators: true,
                }
            );
        }
        res.status(200).json(portfolio);
    } catch (err) {
        next(ApiError.internalServerError(err.message));
        return;
    }
};

module.exports = portfolioHandler;