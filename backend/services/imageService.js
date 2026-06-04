const axios = require("axios");

exports.getPlaceImage = async (place) => {
  try {

    const searchQuery =
      `${place} India tourism landmark`;

    const response = await axios.get(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(searchQuery)}&per_page=1`,
      {
        headers: {
          Authorization:
            "OuO44qPiZXfsJyC1Wo7WV5URCQaSweXz9jEqdQKwH8UCVYX06diWQyMo",
        },
      }
    );

    if (
      response.data.photos &&
      response.data.photos.length > 0
    ) {
      return response.data.photos[0].src.large;
    }

    return "";

  } catch (error) {

    console.log(
      "Image Fetch Error:",
      error.response?.data || error.message
    );

    return "";
  }
};