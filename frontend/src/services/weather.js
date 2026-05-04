const API_KEY = "5bfb72d15874007e90ef2db13a563d3d";

export const getWeather = async (city) => {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    const data = await res.json();

    return {
      temp: data.main.temp,
      condition: data.weather[0].main
    };
  } catch {
    return null;
  }
};