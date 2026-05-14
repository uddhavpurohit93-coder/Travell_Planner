const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  addTrip,
  getTrips,
  updateTrip,
  deleteTrip
} = require("../controllers/tripController");


// ➕ ADD TRIP
router.post("/add-trip", addTrip);

// 📥 GET TRIPS
router.get("/trips/:userId", authMiddleware, getTrips);


// ✏️ UPDATE TRIP
router.put("/update-trip/:id", authMiddleware, updateTrip);


// ❌ DELETE TRIP
router.delete("/delete-trip/:id", authMiddleware, deleteTrip);


module.exports = router;