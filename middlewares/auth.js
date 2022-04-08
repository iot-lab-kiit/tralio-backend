const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (!bearerHeader || !bearerHeader.startsWith("Bearer")) {
    console.log("NO JWT TOKEN");
  } else {
    const bearerToken = bearerHeader.split(" ")[1];
    try {
      const payload = jwt.verify(bearerToken, process.env.JWT_KEY);
      req.user = {
        userId: payload._id,
        email: payload.email,
      };
      next();
    } catch (err) {
      res.status(400).json({ message: "Token Error" });
    }
  }
};

module.exports = auth;
