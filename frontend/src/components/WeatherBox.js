function WeatherBox({ weather }) {
  if (!weather) return null;

  return (
    <div className="mt-3 bg-blue-100 p-2 rounded">
      🌡️ {weather.temp}°C | 🌤️ {weather.condition}
    </div>
  );
}

export default WeatherBox;