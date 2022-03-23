require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connectDB");
const userRoutes = require("./routes/userRoutes/userRoutes");
const postRoutes = require("./routes/postRoutes/postRoutes");
const authRoutes = require("./routes/authRoutes/authRoutes");
const errorHandler = require("./error/errorHandler");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const port = process.env.PORT || 8000;

const notFoundMiddleware = require("./middleware/not-found");

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/auth", authRoutes);

app.use(notFoundMiddleware);

connectDB(process.env.MONGO_URI);

app.get("/", (_, res) => {
  res.status(200).json({ Success: "You have reached the tralio server" });
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
