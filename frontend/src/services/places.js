const API_KEY = "c0daec332a704f3e8c87d9e4b15318b8";

export const getPlaces = async (city) => {
  try {
    const res = await fetch(
      `https://api.geoapify.com/v2/places?categories=tourism.sights&text=${encodeURIComponent(
        city
      )}&limit=5&apiKey=${API_KEY}`
    );

    const data = await res.json();

    if (!data.features || data.features.length === 0) {
      throw new Error("No places");
    }

    return data.features
      .map((p) => p.properties.name)
      .filter(Boolean);

  } catch (err) {
    console.log("fallback used");

    return [
      `${city} Famous Place`,
      `${city} Tourist Spot`,
      `${city} Market`
    ];
  }
};