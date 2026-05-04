const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Trip = require("./Trip");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

// 🔐 AUTH ROUTES
app.use("/api", authRoutes);

// 🗄️ MongoDB Connect
mongoose.connect("mongodb://127.0.0.1:27017/travel")
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend working");
});


// ➕ ADD TRIP (PLAN SAVE INCLUDED)
app.post("/add-trip", authMiddleware, async (req, res) => {
  try {
    const { destination, date, budget, userId, plan } = req.body;

    const newTrip = new Trip({
      destination,
      date,
      budget,
      userId,
      plan // 🔥 PLAN SAVE
    });

    const result = await newTrip.save();
    res.send(result);

  } catch (err) {
    console.log(err);
    res.status(500).send("Error saving trip");
  }
});


// 📥 GET TRIPS (USER-WISE)
app.get("/trips/:userId", authMiddleware, async (req, res) => {
  try {
    const data = await Trip.find({ userId: req.params.userId });
    res.send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching trips");
  }
});


// ❌ DELETE TRIP
app.delete("/delete-trip/:id", authMiddleware, async (req, res) => {
  try {
    await Trip.findByIdAndDelete(req.params.id);
    res.send("Deleted");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error deleting trip");
  }
});


// ✏️ UPDATE TRIP (PLAN UPDATE INCLUDED)
app.put("/update-trip/:id", authMiddleware, async (req, res) => {
  try {
    const { destination, date, budget, userId, plan } = req.body;

    await Trip.findByIdAndUpdate(req.params.id, {
      destination,
      date,
      budget,
      userId,
      plan // 🔥 PLAN UPDATE
    });

    res.send("Updated");

  } catch (err) {
    console.log(err);
    res.status(500).send("Error updating trip");
  }
});


// 🚀 START SERVER
app.listen(5000, () => {
  console.log("Server running on port 5000");
});