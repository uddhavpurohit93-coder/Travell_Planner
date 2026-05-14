const axios = require("axios");

exports.getWeather = async (
  destination
) => {

  try {

    const apiKey =
      process.env.WEATHER_API_KEY;

    const url =
`https://api.openweathermap.org/data/2.5/weather?q=${destination}&appid=${apiKey}&units=metric`;

    const response =
      await axios.get(url);

    return {

      temperature:
        response.data.main.temp,

      condition:
        response.data.weather[0].main,

      humidity:
        response.data.main.humidity,
    };

  } catch (error) {

    console.log(
      error.response?.data || error
    );

    return null;
  }
};