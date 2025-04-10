const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const logger = require("morgan");
const authRoutes = require("./routes/authRoutes");
const seatRouts = require("./routes/seatRoutes");

dotenv.config();
const app = express(); 

app.use(logger("dev")); 

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true, 
  })
);

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/seats", seatRouts);

module.exports = app;