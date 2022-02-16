require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connectDB");
const userRoutes = require("./routes/userRoutes/userRoutes")
const errorHandler = require("./error/errorHandler");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());

const port = process.env.PORT || 8000;

app.use("/api/v1/user", userRoutes);
app.use(errorHandler);

connectDB(process.env.MONGO_URI);

app.get("/", (req, res) => {
  res.send("You have reached the server");
});

app.get("/test", (req, res) => {
  res.send("API is working");
});

app.listen(port, () => console.log(`Server is listening on port ${port}...`));
