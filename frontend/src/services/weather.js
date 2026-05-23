import {
  CloudSun,
  Droplets,
  Thermometer,
  Wind
} from "lucide-react";

function WeatherBox({ weather }) {
  if (!weather) return null;

  const temperature =
    weather.temp ??
    weather.temperature ??
    weather.currentTemp ??
    weather.main?.temp ??
    "N/A";

  const condition =
    weather.condition ??
    weather.description ??
    weather.weather?.[0]?.description ??
    "Clear";

  const humidity =
    weather.humidity ??
    weather.main?.humidity ??
    "N/A";

  const wind =
    weather.wind ??
    weather.windSpeed ??
    weather.wind?.speed ??
    "N/A";

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 overflow-hidden relative shadow-sm">
      <div className="absolute top-[-40px] right-[-40px] w-40 h-40 bg-cyan-500/10 blur-3xl rounded-full" />

      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-sm">
              Current Weather
            </p>

            <h2 className="text-3xl font-bold mt-2 text-slate-900">
              {temperature !== "N/A" ? `${temperature}°C` : "N/A"}
            </h2>
          </div>

          <div className="w-16 h-16 rounded-2xl bg-cyan-50 border border-cyan-100 flex items-center justify-center">
            <CloudSun size={30} className="text-cyan-500" />
          </div>
        </div>

        <p className="mt-4 text-lg text-slate-600 capitalize">
          {condition}
        </p>

        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <Thermometer size={18} className="text-orange-500 mb-2" />
            <p className="text-sm text-slate-500">Temperature</p>
            <h3 className="text-xl font-bold mt-1 text-slate-900">
              {temperature !== "N/A" ? `${temperature}°` : "N/A"}
            </h3>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <Droplets size={18} className="text-cyan-500 mb-2" />
            <p className="text-sm text-slate-500">Humidity</p>
            <h3 className="text-xl font-bold mt-1 text-slate-900">
              {humidity !== "N/A" ? `${humidity}%` : "N/A"}
            </h3>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <Wind size={18} className="text-green-500 mb-2" />
            <p className="text-sm text-slate-500">Wind</p>
            <h3 className="text-xl font-bold mt-1 text-slate-900">
              {wind !== "N/A" ? `${wind} km/h` : "N/A"}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherBox;