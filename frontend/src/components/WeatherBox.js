import {
  CloudSun,
  Droplets,
  Thermometer,
  Wind,
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
    <div
      className="
        relative overflow-hidden
        rounded-[32px]
        bg-white dark:bg-slate-900/90
        backdrop-blur-xl
        border border-slate-200 dark:border-slate-700
        shadow-xl shadow-slate-200/50
        dark:shadow-black/30
        p-8
      "
    >
      {/* GLOW EFFECTS */}
      <div
        className="
          absolute top-[-60px] right-[-60px]
          w-56 h-56
          bg-cyan-500/10
          blur-[100px]
          rounded-full
        "
      />

      <div
        className="
          absolute bottom-[-60px] left-[-60px]
          w-56 h-56
          bg-blue-500/10
          blur-[100px]
          rounded-full
        "
      />

      <div className="relative z-10">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <p
              className="
                text-slate-500 dark:text-slate-400
                text-sm uppercase tracking-widest
                font-semibold
              "
            >
              Current Weather
            </p>

            <h2
              className="
                text-5xl font-black mt-3
                text-slate-900 dark:text-white
              "
            >
              {temperature !== "N/A"
                ? `${temperature}°C`
                : "N/A"}
            </h2>
          </div>

          <div
            className="
              w-20 h-20
              rounded-3xl
              bg-cyan-500/10
              border border-cyan-400/20
              flex items-center justify-center
              backdrop-blur-lg
            "
          >
            <CloudSun
              size={38}
              className="text-cyan-500"
            />
          </div>
        </div>

        {/* CONDITION */}
        <p
          className="
            mt-5
            text-xl
            capitalize
            text-slate-600 dark:text-slate-300
          "
        >
          {condition}
        </p>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
          {/* TEMPERATURE */}
          <div
            className="
              p-5 rounded-3xl
              bg-slate-50 dark:bg-slate-800/60
              border border-slate-200 dark:border-slate-700
              backdrop-blur-lg
            "
          >
            <Thermometer
              size={20}
              className="text-orange-500 mb-3"
            />

            <p className="text-sm text-slate-500 dark:text-slate-400">
              Temperature
            </p>

            <h3 className="text-2xl font-bold mt-2 text-slate-900 dark:text-white">
              {temperature !== "N/A"
                ? `${temperature}°`
                : "N/A"}
            </h3>
          </div>

          {/* HUMIDITY */}
          <div
            className="
              p-5 rounded-3xl
              bg-slate-50 dark:bg-slate-800/60
              border border-slate-200 dark:border-slate-700
              backdrop-blur-lg
            "
          >
            <Droplets
              size={20}
              className="text-cyan-500 mb-3"
            />

            <p className="text-sm text-slate-500 dark:text-slate-400">
              Humidity
            </p>

            <h3 className="text-2xl font-bold mt-2 text-slate-900 dark:text-white">
              {humidity !== "N/A"
                ? `${humidity}%`
                : "N/A"}
            </h3>
          </div>

          {/* WIND */}
          <div
            className="
              p-5 rounded-3xl
              bg-slate-50 dark:bg-slate-800/60
              border border-slate-200 dark:border-slate-700
              backdrop-blur-lg
            "
          >
            <Wind
              size={20}
              className="text-emerald-500 mb-3"
            />

            <p className="text-sm text-slate-500 dark:text-slate-400">
              Wind Speed
            </p>

            <h3 className="text-2xl font-bold mt-2 text-slate-900 dark:text-white">
              {wind !== "N/A"
                ? `${wind} km/h`
                : "N/A"}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherBox;