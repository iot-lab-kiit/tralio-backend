const jwt = require("jsonwebtoken");
const redis_client = require('../redis_connect');
const ApiError = require('../error/ApiError')

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (!bearerHeader || !bearerHeader.startsWith("Bearer")) {
    next(ApiError.unauthorized("Not authorized"))
  } else {
    const bearerToken = bearerHeader.split(" ")[1];
    try {
      const payload = jwt.verify(bearerToken, process.env.SECRET_KEY);
      req.user = {
        _id: payload._id,
        email: payload.email,
      };
      next();
    } catch (err) {
      next(ApiError.badRequest("User not allowed"))
    }
  }
};

const verifyRefreshToken = async (req,res,next)=>{
  const refresh_token = req.body.token;
  if(!refresh_token){
    next(ApiError.badRequest("Invalid request"))
  }
  try {
    const payload = jwt.verify(refresh_token, process.env.REFRESH_SECRET_KEY)
      req.user =  {
        _id: payload._id,
        email: payload.email,
      };
      const userId = payload._id;
      redis_client.get(userId, (err, result)=>{
        if(!result) 
        next(ApiError.notFound("User not found"));
        if(result !== refresh_token)
        next(ApiError.unauthorized("Not valid"));
        next();
    })
  } catch (error) {
    next(ApiError.unauthorized("Session expired"))
  }
}
module.exports = {verifyToken, verifyRefreshToken};