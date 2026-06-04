const Trip = require("../models/tripModel");
const { generateAITrip } = require("../services/aiService");
const { getWeather } = require("../services/weatherService");
const { getPlaceImage } = require("../services/imageService");

// ➕ ADD TRIP
exports.addTrip = async (req, res) => {
  try {
    const { destination, date, budget, days, userId } = req.body;

    // DATE VALIDATION
    if (date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const tripDate = new Date(date);

      if (tripDate < today) {
        return res.status(400).json({
          success: false,
          message: "Travel date cannot be in the past",
        });
      }
    }

    // WEATHER
    const weather = await getWeather(destination);

    // AI PLAN
    const aiPlan = await generateAITrip(
      destination,
      budget,
      days,
      weather
    );

    const cleanResponse = aiPlan
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let parsedPlan;

    try {
      parsedPlan = JSON.parse(cleanResponse);
    } catch (err) {
      console.log("JSON ERROR:", err);

      return res.status(500).json({
        success: false,
        message: "AI returned invalid JSON",
      });
    }

    if (!parsedPlan?.dayPlan) {
      return res.status(500).json({
        success: false,
        message: "Invalid AI response",
      });
    }

    // ==========================
    // DAY PLAN FIX
    // ==========================

    parsedPlan.dayPlan = await Promise.all(
      parsedPlan.dayPlan.map(async (day) => {
        let schedule = Array.isArray(day.schedule)
          ? day.schedule
          : [];

        // fallback places
        if (schedule.length === 0) {
          schedule = [
            {
              place: "Main Attraction",
              description: "Visit famous tourist attraction",
              distance: "2 km",
              transport: "Taxi",
            },
            {
              place: "Local Market",
              description: "Shopping and local culture",
              distance: "1.5 km",
              transport: "Walk",
            },
            {
              place: "Sunset Point",
              description: "Evening sightseeing",
              distance: "3 km",
              transport: "Cab",
            },
          ];
        }

        // transport fallback
        schedule = schedule.map((item) => ({
          ...item,
          distance: item.distance || "2 km",
          transport: item.transport || "Taxi",
        }));

        const firstPlace =
          schedule[0]?.place || destination;

        const image = await getPlaceImage(
          `${firstPlace} ${destination}`
        );

        return {
          day: day.day,
          image,
          schedule,
        };
      })
    );

    // ==========================
    // HOTELS
    // ==========================

    const hotelsWithImages = [];

    if (parsedPlan.hotels) {
      for (const hotel of parsedPlan.hotels) {
        const image = await getPlaceImage(
          `${hotel.name} hotel ${destination}`
        );

        const cleanPrice = Number(
          (hotel.price || "")
            .toString()
            .replace(/[^0-9]/g, "")
        );

        hotelsWithImages.push({
          ...hotel,
          price: cleanPrice,
          image,
        });
      }
    }

    // ==========================
    // FOOD
    // ==========================

    const foodRecommendations = [];

    if (parsedPlan.foodRecommendations) {
      for (const food of parsedPlan.foodRecommendations) {
        const name =
          typeof food === "string"
            ? food
            : food.name;

        const image = await getPlaceImage(
          `${name} restaurant ${destination}`
        );

        foodRecommendations.push({
          name,
          image,
        });
      }
    }

    // ==========================
    // HIDDEN GEMS
    // ==========================

    const hiddenGems = [];

    if (parsedPlan.hiddenGems) {
      for (const gem of parsedPlan.hiddenGems) {
        const name =
          typeof gem === "string"
            ? gem
            : gem.name;

        const image = await getPlaceImage(
          `${name} tourist attraction ${destination}`
        );

        hiddenGems.push({
          name,
          image,
        });
      }
    }

    // SAVE TRIP

    const newTrip = new Trip({
      destination,
      date,
      budget,
      days,
      userId: userId || "default-user",
      weather,

      packingList:
        parsedPlan.packingList || [],

      plan: {
        dayPlan: parsedPlan.dayPlan,

        hotels: hotelsWithImages,

        foodRecommendations,

        hiddenGems,

        transport:
          parsedPlan.transport || [
            "Taxi",
            "Bus",
            "Metro",
          ],

        breakdown:
          parsedPlan.breakdown || {
            hotel: 0,
            food: 0,
            travel: 0,
            activities: 0,
          },

        estimatedTotal:
          parsedPlan.estimatedTotal || 0,
      },
    });

    const result = await newTrip.save();

    return res.status(201).json({
      success: true,
      message: "Trip generated successfully",
      data: result,
    });
  } catch (err) {
    console.log("FULL ERROR:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// GET TRIPS
exports.getTrips = async (req, res) => {
  try {
    const trips = await Trip.find({
      userId: req.params.userId,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: trips,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Error fetching trips",
    });
  }
};

// DELETE TRIP
exports.deleteTrip = async (req, res) => {
  try {
    await Trip.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Trip deleted successfully",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Error deleting trip",
    });
  }
};

// UPDATE TRIP
exports.updateTrip = async (req, res) => {
  try {
    const {
      destination,
      date,
      budget,
      days,
      userId,
      plan,
    } = req.body;

    await Trip.findByIdAndUpdate(
      req.params.id,
      {
        destination,
        date,
        budget,
        days,
        userId,
        plan,
      }
    );

    res.status(200).json({
      success: true,
      message: "Trip updated successfully",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Error updating trip",
    });
  }
};