const ACCESS_KEY = "gri_WIVc4aib5Gmt7xAAkJpqKY08t3lqUB4cVUfkWL0";

export const getPlaceImage = async (place, city) => {
  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${place} ${city}&per_page=1&client_id=${ACCESS_KEY}`
    );

    const data = await res.json();

    return data.results?.[0]?.urls?.small || null;
  } catch {
    return null;
  }
};