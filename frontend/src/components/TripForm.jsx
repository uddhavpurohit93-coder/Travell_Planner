import {
  MapPin,
  CalendarDays,
  Wallet,
  Clock3,
  Sparkles
} from "lucide-react";

function TripForm({
  destination,
  setDestination,
  date,
  setDate,
  budget,
  setBudget,
  days,
  setDays,
  onGenerate,
  onSubmit,
  editMode,
  onUpdate
}) {

  const inputStyle = `
    w-full px-5 py-4
    rounded-2xl
    bg-[#101826]
    border border-white/10
    text-white
    placeholder:text-gray-500
    outline-none
    transition-all duration-200
    focus:border-cyan-400
    focus:bg-[#131d2d]
  `;

  return (

    <div className="space-y-8">

      {/* HEADER */}

      <div className="space-y-2">

        <div className="
          inline-flex items-center gap-2
          px-4 py-2 rounded-full
          bg-cyan-500/10
          border border-cyan-400/20
          text-cyan-300 text-sm
        ">

          <Sparkles size={16} />

          AI Travel Planner

        </div>

        <h1 className="
          text-4xl md:text-5xl
          font-bold
          leading-tight
          tracking-tight
        ">

          Plan your next
          <span className="
            block text-transparent
            bg-clip-text
            bg-gradient-to-r
            from-cyan-400
            to-blue-500
          ">
            dream adventure
          </span>

        </h1>

        <p className="
          text-gray-400
          text-lg
          max-w-2xl
        ">

          Generate personalized AI-powered
          itineraries with hotels, weather,
          hidden gems, food spots and
          smart travel recommendations.

        </p>

      </div>

      {/* FORM */}

      <div className="
        grid grid-cols-1
        md:grid-cols-2
        gap-5
      ">

        {/* DESTINATION */}

        <div className="space-y-2">

          <label className="
            text-sm text-gray-400
            flex items-center gap-2
          ">
            <MapPin size={16} />
            Destination
          </label>

          <input
            placeholder="Where do you want to go?"
            className={inputStyle}
            value={destination}
            onChange={(e) =>
              setDestination(e.target.value)
            }
          />

        </div>

        {/* DATE */}

        <div className="space-y-2">

          <label className="
            text-sm text-gray-400
            flex items-center gap-2
          ">
            <CalendarDays size={16} />
            Travel Date
          </label>

          <input
            type="date"
            className={inputStyle}
            value={date}
            onChange={(e) =>
              setDate(e.target.value)
            }
          />

        </div>

        {/* BUDGET */}

        <div className="space-y-2">

          <label className="
            text-sm text-gray-400
            flex items-center gap-2
          ">
            <Wallet size={16} />
            Budget
          </label>

          <input
            placeholder="₹ Enter your budget"
            className={inputStyle}
            value={budget}
            onChange={(e) =>
              setBudget(e.target.value)
            }
          />

        </div>

        {/* DAYS */}

        <div className="space-y-2">

          <label className="
            text-sm text-gray-400
            flex items-center gap-2
          ">
            <Clock3 size={16} />
            Number of Days
          </label>

          <input
            placeholder="How many days?"
            className={inputStyle}
            value={days}
            onChange={(e) =>
              setDays(e.target.value)
            }
          />

        </div>

      </div>

      {/* ACTIONS */}

      <div className="
        flex flex-col md:flex-row
        gap-4 pt-2
      ">

        <button
          onClick={onGenerate}
          className="
            flex-1
            py-4 rounded-2xl
            bg-gradient-to-r
            from-cyan-500
            to-blue-500
            font-semibold
            text-lg
            hover:opacity-90
            transition-all duration-200
            shadow-lg shadow-cyan-500/20
          "
        >

          Generate AI Trip

        </button>

        {editMode ? (

          <button
            onClick={onUpdate}
            className="
              flex-1 py-4
              rounded-2xl
              bg-yellow-500
              text-black
              font-semibold
              text-lg
              hover:opacity-90
              transition-all duration-200
            "
          >

            Update Trip

          </button>

        ) : (

          <button
            onClick={onSubmit}
            className="
              flex-1 py-4
              rounded-2xl
              bg-white text-black
              font-semibold
              text-lg
              hover:bg-gray-200
              transition-all duration-200
            "
          >

            Save Trip

          </button>

        )}

      </div>

    </div>
  );
}

export default TripForm;