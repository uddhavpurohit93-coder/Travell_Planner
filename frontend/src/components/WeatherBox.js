import {
  CloudSun,
  Droplets,
  Thermometer,
  Wind
} from "lucide-react";

function WeatherBox({ weather }) {

  if (!weather) return null;

  return (

    <div className="
      bg-[#101826]
      border border-white/10
      rounded-2xl
      p-6
      overflow-hidden
      relative
    ">

      {/* GLOW */}

      <div className="
        absolute top-[-40px]
        right-[-40px]
        w-40 h-40
        bg-cyan-500/10
        blur-3xl
        rounded-full
      "></div>

      <div className="
        relative z-10
      ">

        {/* HEADER */}

        <div className="
          flex items-center
          justify-between
        ">

          <div>

            <p className="
              text-gray-400
              text-sm
            ">

              Current Weather

            </p>

            <h2 className="
              text-3xl font-bold mt-2
            ">

              {weather.temp}°C

            </h2>

          </div>

          <div className="
            w-16 h-16
            rounded-2xl
            bg-cyan-500/10
            border border-cyan-400/20
            flex items-center justify-center
          ">

            <CloudSun
              size={30}
              className="text-cyan-400"
            />

          </div>

        </div>

        {/* CONDITION */}

        <p className="
          mt-4
          text-lg
          text-gray-300
        ">

          {weather.condition}

        </p>

        {/* STATS */}

        <div className="
          grid grid-cols-3
          gap-4 mt-6
        ">

          {/* TEMP */}

          <div className="
            p-4 rounded-2xl
            bg-[#0d1522]
            border border-white/10
          ">

            <Thermometer
              size={18}
              className="
                text-orange-400 mb-2
              "
            />

            <p className="
              text-sm text-gray-400
            ">

              Temperature

            </p>

            <h3 className="
              text-xl font-bold mt-1
            ">

              {weather.temp}°

            </h3>

          </div>

          {/* HUMIDITY */}

          <div className="
            p-4 rounded-2xl
            bg-[#0d1522]
            border border-white/10
          ">

            <Droplets
              size={18}
              className="
                text-cyan-400 mb-2
              "
            />

            <p className="
              text-sm text-gray-400
            ">

              Humidity

            </p>

            <h3 className="
              text-xl font-bold mt-1
            ">

              {weather.humidity || 50}%

            </h3>

          </div>

          {/* WIND */}

          <div className="
            p-4 rounded-2xl
            bg-[#0d1522]
            border border-white/10
          ">

            <Wind
              size={18}
              className="
                text-green-400 mb-2
              "
            />

            <p className="
              text-sm text-gray-400
            ">

              Wind

            </p>

            <h3 className="
              text-xl font-bold mt-1
            ">

              12 km/h

            </h3>

          </div>

        </div>

      </div>

    </div>
  );
}

export default WeatherBox;