// services/places.js

export const getPlaces = async (city, days = 5) => {
  try {

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [
          {
            role: "user",
            content: `Give me exactly ${days} famous tourist places to visit in ${city}, India.
Return ONLY a JSON array of place names. No explanation, no extra text.
Example format: ["Place 1", "Place 2", "Place 3"]
Make sure all places are REAL and SPECIFIC to ${city}.`
          }
        ]
      })
    });

    const data = await response.json();
    const text = data.content[0].text.trim();

    // JSON parse करो
    const clean = text.replace(/```json|```/g, "").trim();
    const places = JSON.parse(clean);

    console.log(`✅ AI places for ${city}:`, places);

    return places;

  } catch (err) {
    console.log("❌ AI fallback:", err.message);

    // Fallback
    return Array.from({ length: days }, (_, i) =>
      `${city} Tourist Spot ${i + 1}`
    );
  }
};