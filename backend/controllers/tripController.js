const Trip = require("../models/tripModel");

const {
  generateAITrip
} = require("../services/aiService");

const {
  getWeather
} = require("../services/weatherService");

const {
  getPlaceImage
} = require("../services/imageService");


// ➕ ADD TRIP
exports.addTrip = async (req, res) => {

  try {

   const {
  destination,
  date,
  budget,
  days,
  userId
} = req.body;

    // 🌤 GET WEATHER
    const weather =
      await getWeather(destination);

    // 🤖 AI GENERATE PLAN
    const aiPlan =
      await generateAITrip(
    destination,
    budget,
    days,
    weather
);
    // 🧹 CLEAN AI RESPONSE
    const cleanResponse = aiPlan
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // 🔄 STRING → JSON
    const parsedPlan =
      JSON.parse(cleanResponse);

    // 🖼 GET REAL IMAGES
    if (parsedPlan.dayPlan) {

      for (const item of parsedPlan.dayPlan) {

        item.image =
          await getPlaceImage(
            item.place
          );
      }
    }

    // 💾 SAVE TO DB
    const newTrip = new Trip({

      destination,

      date,

      budget,

      userId,

      weather,

      packingList:
        parsedPlan.packingList || [],

      plan: {

        ...parsedPlan,

        // 🚕 TRANSPORT FIX
        transport:
          parsedPlan.transport?.map(
            (item) => item.type
          ) || [],

        // 🍔 FOOD FIX
        foodRecommendations:
          parsedPlan.foodRecommendations?.map(
            (item) => item.name
          ) || [],
      }
    });

    const result =
      await newTrip.save();

    res.status(201).json({
      success: true,
      message:
        "Trip generated successfully",
      data: result
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message:
        "Error saving trip"
    });
  }
};


// 📥 GET TRIPS
exports.getTrips = async (req, res) => {

  try {

    const data = await Trip.find({
      userId: req.params.userId
    });

    res.status(200).json({
      success: true,
      data
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message:
        "Error fetching trips"
    });
  }
};


// ❌ DELETE TRIP
exports.deleteTrip = async (req, res) => {

  try {

    await Trip.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message:
        "Trip deleted successfully"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message:
        "Error deleting trip"
    });
  }
};


// ✏️ UPDATE TRIP
exports.updateTrip = async (req, res) => {

  try {

  const {
  destination,
  date,
  budget,
  days,
  userId
} = req.body;

    await Trip.findByIdAndUpdate(
      req.params.id,
      {
        destination,
        date,
        budget,
        userId,
        plan
      }
    );

    res.status(200).json({
      success: true,
      message:
        "Trip updated successfully"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message:
        "Error updating trip"
    });
  }
};