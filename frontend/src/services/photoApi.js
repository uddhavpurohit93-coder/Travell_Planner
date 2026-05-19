export const getPhotos = async (query) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/photos/search?query=${encodeURIComponent(
        query
      )}`
    );

    const data = await response.json();

    if (!data.success) {
      return [];
    }

    return data.photos;
  } catch (error) {
    console.error("Photo API error:", error);
    return [];
  }
};