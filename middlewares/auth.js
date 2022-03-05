// const user = require("../models/user/userSchema");
const jwt = require("jsonwebtoken");
const redis_client = require('../redis_connect');

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (!bearerHeader || !bearerHeader.startsWith("Bearer")) {
    console.log("NO JWT TOKEN");
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
      res.status(400).json({ message: "Token Error" });
    }
  }
};

const verifyRefreshToken = async (req,res,next)=>{
  const refresh_token = req.body.token;
  if(!refresh_token){
    return res.status(401).json({message : "Invalid request"})
  }
  try {
    const payload = jwt.verify(refresh_token, process.env.REFRESH_SECRET_KEY)
      req.user =  {
        _id: payload._id,
        email: payload.email,
      };
      const userId = payload._id;
      redis_client.get(userId, (err, result)=>{
        if(!result) return res.status(401).json({message : "Invalid request. Token is not in cache"});
        if(result !== refresh_token)
          return res.status(401).json({message : "Invalid request. Token is not same"});
        next();
    })
  } catch (error) {
    return res.status(401).json({message :  `Session is invalid`})
  }
}

module.exports = {verifyToken, verifyRefreshToken};