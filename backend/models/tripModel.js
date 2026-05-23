const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    destination: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    budget: {
      type: Number,
      required: true,
    },

    travelers: {
      type: Number,
      default: 1,
    },

    mood: {
      type: String,
    },

    userId: {
      type: String,
      default: "guest-user",
    },

    // 🌤 WEATHER
    weather: {
      temperature: String,
      condition: String,
      humidity: String,
    },

    // 🎒 PACKING LIST
    packingList: [String],

    // 📅 AI PLAN
    plan: {
      // 🗓 DAY PLAN
      dayPlan: [
        {
          day: Number,

          place: String,

          image: String,

          rating: String,

          distance: String,

          description: String,
        },
      ],

      // 🏨 HOTELS
      hotels: [
        {
          name: String,

          image: String,

          rating: String,

          price: Number,

          location: String,
        },
      ],

      // 🚕 TRANSPORT
      transport: [String],

      // 🍔 FOOD RECOMMENDATIONS
      foodRecommendations: [
        {
          name: String,

          image: String,
        },
      ],

      // 📍 HIDDEN GEMS
      hiddenGems: [
        {
          name: String,

          image: String,
        },
      ],

      // 💰 COST BREAKDOWN
      breakdown: {
        hotel: Number,

        food: Number,

        travel: Number,

        activities: Number,
      },

      estimatedTotal: Number,
    },

    // ❤️ WISHLIST
    wishlist: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Trip", tripSchema);