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

    days: {
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

    // 🌤 Weather
    weather: {
      temperature: String,
      condition: String,
      humidity: String,
    },

    // 🎒 Packing List
    packingList: [String],

    // 📅 AI Generated Plan
    plan: {
      // 🗓 Day Wise Plan
      dayPlan: [
 {
   day: Number,
   image: String,

   schedule: [
     {
       place: String,
       description: String,
       distance: String,
     }
   ],

   transport: [
     {
       from: String,
       to: String,
       distance: String,
       transport: String,
       time: String,
     }
   ]
 }
],
      // 🏨 Hotels
      hotels: [
        {
          name: String,

          image: String,

          rating: String,

          price: Number,

          location: String,
        },
      ],

      // 🍔 Food Recommendations
      foodRecommendations: [
        {
          name: String,

          image: String,
        },
      ],

      // 📍 Hidden Gems
      hiddenGems: [
        {
          name: String,

          image: String,
        },
      ],

      // 🚖 General Transport
      transport: [String],

      // 💰 Budget Breakdown
      breakdown: {
        hotel: Number,

        food: Number,

        travel: Number,

        activities: Number,
      },

      estimatedTotal: Number,
    },

    // ❤️ Wishlist
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