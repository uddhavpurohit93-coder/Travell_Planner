const dotenv = require("dotenv");

dotenv.config({ quiet: true });

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const tripRoutes = require("./routes/tripRoutes");

const app = express();

// 🔥 DATABASE CONNECT
connectDB();

// 🔥 MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

// 🔥 ROUTES
app.use("/api", authRoutes);
app.use("/api", tripRoutes);

// 🔥 TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend working");
});

// 🔥 SERVER START
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});