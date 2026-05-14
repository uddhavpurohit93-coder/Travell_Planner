const axios = require("axios");

exports.getPlaceImage = async (
  place
) => {

  try {

    const response =
      await axios.get(

`https://api.pexels.com/v1/search?query=${place}&per_page=1`,

      {
        headers: {
          Authorization:
            process.env.PEXELS_API_KEY
        }
      }
    );

    return response
      .data
      .photos[0]
      .src
      .large;

  } catch (error) {

    console.log(error);

    return "";
  }
};