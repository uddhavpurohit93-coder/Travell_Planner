const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey:process.env.GROQ_API_KEY,
});

exports.generateAITrip = async (destination, budget, days, weather) => {
  const prompt = `
You are a professional travel planner AI.

Generate a complete ${days}-day travel itinerary for ${destination}
with a total budget of ₹${budget}.

Weather:
Temperature: ${weather?.temperature}
Condition: ${weather?.condition}

IMPORTANT RULES:

1. Return ONLY valid JSON.
2. No markdown.
3. No explanation.
4. No text outside JSON.
5. Generate EXACTLY ${days} days.
6. Each day must contain 3-5 tourist places.
7. No duplicate places.
8. Add realistic distances.
9. Add transport details between places.
HOTEL RULES:
- Return EXACTLY 5 hotels
- Must all be different
- Must be real hotels in destination with their real photos

FOOD RULES:
- Return EXACTLY 8 food recommendations
- Include famous restaurants and cafes
- No duplicates
- include real phtos of cafes or hotels

HIDDEN GEMS RULES:
- Return EXACTLY 5 hidden gems
- Must be lesser-known real places
- No duplicates
- use real photos of hidden gems

TRANSPORT RULES:
For every day create transport array.

Example:

"transport": [
 {
   "from":"City Palace",
   "to":"Lake Pichola",
   "distance":"2 km",
   "transport":"Auto Rickshaw",
   "time":"10 min"
 },
 {
   "from":"Lake Pichola",
   "to":"Bagore Ki Haveli",
   "distance":"1 km",
   "transport":"Walk",
   "time":"12 min"
 }
]

JSON FORMAT:

{
  "hotels": [
    {
      "name": "",
      "location": "",
      "rating": 4.5,
      "price": ""
    }
  ],

  "packingList": [],

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
          "distance": "1.5 km"
        }
      ],

      "transport": [
        {
          "from": "",
          "to": "",
          "distance": "",
          "transport": "",
          "time": ""
        }
      ]
    }
  ],

  "foodRecommendations": [],

  "hiddenGems": [],

  "transport": [
    "Taxi",
    "Auto",
    "Bus"
  ],

  "breakdown": {
    "hotel": 0,
    "food": 0,
    "travel": 0,
    "activities": 0
  },

  "estimatedTotal": 0
}

Transport Example:

{
  "from": "City Palace",
  "to": "Lake Pichola",
  "distance": "2 km",
  "transport": "Auto Rickshaw",
  "time": "10 min"
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
      temperature: 0.7,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("AI Trip Error:", error);
    throw new Error("Failed to generate trip plan");
  }
};