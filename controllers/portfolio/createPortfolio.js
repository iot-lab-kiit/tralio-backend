const Portfolio = require("../../models/portfolio/portfolioSchema");
const ApiError = require("../../error/ApiError");

const create = async (req, res) => {
  res.send("Create Controller");
};

module.exports = create;
