const Trip = require("../models/tripModel");
const { generateAITrip } = require("../services/aiService");
const { getWeather } = require("../services/weatherService");
const { getPlaceImage } = require("../services/imageService");

// ➕ ADD TRIP
exports.addTrip = async (req, res) => {
  try {
    const { destination, date, budget, days, userId } = req.body;

    // ✅ Server-side date validation — reject past dates
    if (date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tripDate = new Date(date);
      if (tripDate < today) {
        return res.status(400).json({
          success: false,
          message: "Travel date cannot be in the past. Please choose a future date.",
        });
      }
    }

    // 🌤 WEATHER
    const weather = await getWeather(destination);

    // 🤖 AI PLAN
    const aiPlan = await generateAITrip(destination, budget, days, weather);

    // 🧹 CLEAN AI RESPONSE
    const cleanResponse = aiPlan.replace(/```json/g, "").replace(/```/g, "").trim();

    // 🔄 STRING → JSON
    const parsedPlan = JSON.parse(cleanResponse);

    // 🖼 DAY PLAN IMAGES
    if (parsedPlan.dayPlan) {
      for (const item of parsedPlan.dayPlan) {
        item.image = await getPlaceImage(`${item.place} ${destination}`);
      }
    }

    // 🏨 HOTEL IMAGES
    const hotelPhotos = [
      await getPlaceImage(`${destination} luxury hotel`),
      await getPlaceImage(`${destination} resort`),
      await getPlaceImage(`${destination} heritage hotel`),
    ];

    // 🍔 FOOD IMAGES
    const foodPhotos = [];
    if (parsedPlan.foodRecommendations) {
      for (const food of parsedPlan.foodRecommendations) {
        const foodName = typeof food === "string" ? food : food.name;
        const foodImage = await getPlaceImage(`${foodName} food ${destination}`);
        foodPhotos.push({ name: foodName, image: foodImage });
      }
    }

    // 💎 HIDDEN GEMS IMAGES
    const gemsWithImages = [];
    if (parsedPlan.hiddenGems) {
      for (const gem of parsedPlan.hiddenGems) {
        const gemName = typeof gem === "string" ? gem : gem.name;
        const gemImage = await getPlaceImage(`${gemName} ${destination}`);
        gemsWithImages.push({ name: gemName, image: gemImage });
      }
    }

    // ✅ Use the real userId from request body (set by frontend from auth)
    const savedUserId = userId || "default-user";

    // 💾 SAVE TO DB
    const newTrip = new Trip({
      destination,
      date,
      budget,
      days,
      userId: savedUserId,
      weather,
      packingList: parsedPlan.packingList || [],
      plan: {
        ...parsedPlan,
        hotels: [
          { name: `${destination} Grand Palace`, location: destination, rating: 4.8, price: "18000", image: hotelPhotos[0] },
          { name: `${destination} Luxury Resort`, location: destination, rating: 4.7, price: "24000", image: hotelPhotos[1] },
          { name: `${destination} Heritage Stay`, location: destination, rating: 4.6, price: "12000", image: hotelPhotos[2] },
        ],
        foodRecommendations: foodPhotos,
        hiddenGems: gemsWithImages,
        transport: parsedPlan.transport?.map((item) => item.type || item) || [],
      },
    });

    const result = await newTrip.save();

    res.status(201).json({
      success: true,
      message: "Trip generated and saved successfully",
      data: result,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Error saving trip" });
  }
};

// 📥 GET TRIPS — user-specific
exports.getTrips = async (req, res) => {
  try {
    const data = await Trip.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Error fetching trips" });
  }
};

// ❌ DELETE TRIP
exports.deleteTrip = async (req, res) => {
  try {
    await Trip.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Trip deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Error deleting trip" });
  }
};

// ✏️ UPDATE TRIP
exports.updateTrip = async (req, res) => {
  try {
    const { destination, date, budget, days, userId, plan } = req.body;
    await Trip.findByIdAndUpdate(req.params.id, { destination, date, budget, days, userId, plan });
    res.status(200).json({ success: true, message: "Trip updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Error updating trip" });
  }
};
