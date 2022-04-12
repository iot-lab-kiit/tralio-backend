require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connectDB");
const userRoutes = require("./routes/userRoutes/userRoutes");
const postRoutes = require("./routes/postRoutes/postRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes/portfolioRoutes");
const emailRoutes = require("./routes/emailRoutes");
const errorHandler = require("./error/errorHandler");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser(process.env.COOKIE_SECRET));

const port = process.env.PORT || 8000;

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/portfolio", portfolioRoutes);
app.use("/api/v1/emails", emailRoutes);
app.use(errorHandler);

connectDB(process.env.MONGO_URI);

app.get("/", (_, res) => {
  res.status(200).json({ Success: "You have reached the tralio server" });
});

app.get("/api/v1/cookie", function (req, res) {
  res.cookie("cookie1", "This is my first cookie", {
    signed: true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  });
  res.status(200).json("hello");
});

app.get("/dbstatus", (req, res) => {
  const dbConnection = mongoose.connection.readyState;
  if (dbConnection == 1) {
    res.send("DB Connected");
  } else if (dbConnection == 2) {
    res.send("Connecting to DB");
  } else if (dbConnection == 3) {
    res.send("Disconnecting from DB");
  } else {
    res.send("DB is disconnected");
  }
});

app.listen(port, () => console.log(`Server is listening on port ${port}...`));
