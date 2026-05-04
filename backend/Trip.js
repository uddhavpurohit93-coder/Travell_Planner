const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  destination: String,
  date: String,
  budget: Number,
  userId: String,

  // 🔥 ADD THIS
  plan: {
     dayPlan: [
    {
      day: Number,
      place: String,
      image: String,
      rating: String,
      distance: String
    }
  ],
    hotel: String,
    breakdown: {
      hotel: Number,
      food: Number,
      travel: Number
    }
  }
});

module.exports = mongoose.model("Trip", tripSchema);