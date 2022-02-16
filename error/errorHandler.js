const ApiError = require("./ApiError")

function errorHandler(err, req, res, next) {
  
  if (err instanceof ApiError) {
    res.status(err.code).json({message: err.message});
    return;
  }

  res.status(500).json({message: "Something Went Wrong"});
}

module.exports = errorHandler;