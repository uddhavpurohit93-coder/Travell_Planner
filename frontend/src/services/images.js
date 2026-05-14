// services/images.js

const UNSPLASH_KEY = "YOUR_UNSPLASH_ACCESS_KEY";

export const getPlaceImage = async (place, city) => {
  try {

    const query = `${place} ${city} India tourism`;

    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&client_id=${UNSPLASH_KEY}`
    );

    const data = await res.json();

    if (data.results && data.results.length > 0) {
      return data.results[0].urls.regular;
    }

    throw new Error("No image");

  } catch (err) {

    // Fallback — Unsplash random image
    return `https://source.unsplash.com/800x600/?${encodeURIComponent(place + " " + city)}`;

  }
};