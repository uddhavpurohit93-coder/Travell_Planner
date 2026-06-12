const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

exports.generateAITrip = async (
  destination,
  budget,
  days,
  weather
) => {
  const limitedDays = Math.min(Number(days), 10);

  const prompt = `
You are a professional travel planner AI.

Generate a complete ${limitedDays}-day travel itinerary for ${destination}.

TOTAL TRIP BUDGET: ₹${budget}

Weather:
Temperature: ${weather?.temperature}
Condition: ${weather?.condition}

IMPORTANT RULES:

1. Return ONLY valid JSON.
2. No markdown.
3. No explanation.
4. No text outside JSON.
5. Generate EXACTLY ${limitedDays} days.
6. Each day must contain EXACTLY 3 tourist places.
7. No duplicate places.
8. Keep descriptions very short (5-8 words max).
9. Keep response compact.
10. Use REAL places, hotels and restaurants.
11. Everything must match the given budget.

HOTEL RULES:

- Return EXACTLY 5 hotels
- All hotels must be different
- Use REAL hotels from ${destination}
- Hotel prices must be realistic

BUDGET HOTEL SELECTION:

IF TOTAL BUDGET <= 20000:
- Select only budget hotels
- Hotel price range: ₹800 - ₹2500 per night

IF TOTAL BUDGET > 20000 AND <= 60000:
- Select only mid-range hotels
- Hotel price range: ₹2500 - ₹7000 per night

IF TOTAL BUDGET > 60000:
- Select only luxury hotels
- Hotel price range: ₹7000 - ₹25000 per night

DO NOT:
- Return luxury hotels for budget trips
- Return budget hotels for luxury trips
- Repeat hotels

FOOD RULES:

- Return EXACTLY 4 food recommendations
- Use famous restaurants/cafes from ${destination}
- No duplicates
- Match budget category

HIDDEN GEMS RULES:

- Return EXACTLY 3 hidden gems
- Must be real places
- No duplicates

BUDGET BREAKDOWN RULES:

- hotel + food + travel + activities = estimatedTotal
- estimatedTotal should be close to ₹${budget}

JSON FORMAT:

{
  "hotels": [
    {
      "name": "",
      "location": "",
      "rating": 4.5,
      "price": 0
    }
  ],

  "dayPlan": [
    {
      "day": 1,
      "schedule": [
        {
          "time": "Morning",
          "place": "",
          "description": "",
          "distance": "0 km"
        },
        {
          "time": "Afternoon",
          "place": "",
          "description": "",
          "distance": "2 km"
        },
        {
          "time": "Evening",
          "place": "",
          "description": "",
          "distance": "1 km"
        }
      ]
    }
  ],

  "foodRecommendations": [
    {
      "name": ""
    }
  ],

  "hiddenGems": [
    {
      "name": "",
      "description": ""
    }
  ],

  "breakdown": {
    "hotel": 0,
    "food": 0,
    "travel": 0,
    "activities": 0
  },

  "estimatedTotal": 0
}

Return only JSON.
`;

  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.6,
      max_tokens: 4000,
    });

    const content =
      response?.choices?.[0]?.message?.content || "";

    console.log("================================");
    console.log("AI RESPONSE START");
    console.log(content);
    console.log("AI RESPONSE END");
    console.log("================================");

    return content;
  } catch (error) {
    console.error("AI Trip Error:", error);
    throw new Error("Failed to generate trip plan");
  }
};