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

  const prompt = `
Generate a complete ${days} days luxury travel plan for ${destination}
under budget ₹${budget}.

Current weather:
Temperature: ${weather?.temperature}°C
Condition: ${weather?.condition}

IMPORTANT:
Return ONLY valid JSON.
Do not add markdown.
Do not add explanation.
Do not use \`\`\`json.

VERY IMPORTANT RULES:

- You MUST generate EXACTLY ${days} unique dayPlan objects
- Do NOT generate less than ${days} days
- foodRecommendations MUST contain at least 5 REAL famous restaurants or cafes from ${destination}
- hiddenGems MUST contain at least 3 REAL hidden places from ${destination}
- transport MUST contain at least 3 transport options used in ${destination}
- hotel names must be REAL hotels from ${destination}
- All recommendations must belong to ${destination}
- Never return empty arrays
- estimatedTotal must stay under ₹${budget}

JSON FORMAT:

{
  "hotel": {
    "budget": "Real Hotel Name",
    "luxury": "Real Luxury Hotel Name"
  },

  "packingList": [
    "Cotton clothes",
    "Sunscreen",
    "Shoes"
  ],

  "dayPlan": [
    {
      "day": 1,
      "place": "Place Name",
      "image": "",
      "rating": "4.5",
      "distance": "2 km",
      "description": "Beautiful tourist attraction"
    }
  ],

  "transport": [
    "Taxi",
    "Scooter",
    "Auto Rickshaw"
  ],

  "foodRecommendations": [
    "Restaurant 1",
    "Restaurant 2",
    "Restaurant 3",
    "Restaurant 4",
    "Restaurant 5"
  ],

  "hiddenGems": [
    "Hidden Place 1",
    "Hidden Place 2",
    "Hidden Place 3"
  ],

  "breakdown": {
    "hotel": 5000,
    "food": 3000,
    "travel": 2000,
    "activities": 2000
  },

  "estimatedTotal": 12000
}
`;

  const response =
    await groq.chat.completions.create({

      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],

      temperature: 0.7,
    });

  return response
    .choices[0]
    .message
    .content;
};