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
    w-full
    px-5
    py-4
    rounded-2xl
    bg-white
    text-slate-900
    placeholder:text-slate-400
    border
    border-slate-200
    outline-none
    shadow-sm
    transition-all
    duration-300
    focus:bg-white
    focus:text-slate-900
    focus:border-cyan-400
    focus:ring-2
    focus:ring-cyan-100
  `;

  return (
    <div
      className="
        relative
        rounded-[34px]
        bg-white
        border
        border-slate-200
        shadow-[0_25px_80px_rgba(15,23,42,0.16)]
        ring-1
        ring-slate-100
        px-7
        md:px-12
        py-10
        overflow-hidden
      "
    >
      {/* SOFT BACKGROUND SHADE */}
      <div className="absolute inset-0 rounded-[34px] bg-gradient-to-br from-cyan-50/70 via-white to-blue-50/60 pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-cyan-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl pointer-events-none" />

      {/* CONTENT */}
      <div className="relative z-10 space-y-8">
        {/* HEADER */}
        <div className="space-y-2">
          <div
            className="
              inline-flex items-center gap-2
              px-4 py-2 rounded-full
              bg-cyan-500/10
              border border-cyan-400/20
              text-cyan-500 text-sm
            "
          >
            <Sparkles size={16} />
            AI Travel Planner
          </div>

          <h1
            className="
              text-4xl md:text-5xl
              font-bold
              leading-tight
              tracking-tight
              text-slate-950
            "
          >
            Plan your next
            <span
              className="
                block text-transparent
                bg-clip-text
                bg-gradient-to-r
                from-cyan-400
                to-blue-500
              "
            >
              dream adventure
            </span>
          </h1>

          <p
            className="
              text-slate-500
              text-lg
              max-w-2xl
            "
          >
            Generate personalized AI-powered itineraries with hotels, weather,
            hidden gems, food spots and smart travel recommendations.
          </p>
        </div>

        {/* FORM */}
        <div
          className="
            grid grid-cols-1
            md:grid-cols-2
            gap-5
          "
        >
          {/* DESTINATION */}
          <div className="space-y-2">
            <label
              className="
                text-sm text-slate-400
                flex items-center gap-2
              "
            >
              <MapPin size={16} />
              Destination
            </label>

            <input
              placeholder="Where do you want to go?"
              className={inputStyle}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>

          {/* DATE */}
          <div className="space-y-2">
            <label
              className="
                text-sm text-slate-400
                flex items-center gap-2
              "
            >
              <CalendarDays size={16} />
              Travel Date
            </label>

            <input
              type="date"
              className={inputStyle}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {/* BUDGET */}
          <div className="space-y-2">
            <label
              className="
                text-sm text-slate-400
                flex items-center gap-2
              "
            >
              <Wallet size={16} />
              Budget
            </label>

            <input
              placeholder="₹ Enter your budget"
              className={inputStyle}
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
          </div>

          {/* DAYS */}
          <div className="space-y-2">
            <label
              className="
                text-sm text-slate-400
                flex items-center gap-2
              "
            >
              <Clock3 size={16} />
              Number of Days
            </label>

            <input
              placeholder="How many days?"
              className={inputStyle}
              value={days}
              onChange={(e) => setDays(e.target.value)}
            />
          </div>
        </div>

        {/* ACTIONS */}
        <div
          className="
            flex flex-col md:flex-row
            gap-4 pt-2
          "
        >
          <button
            onClick={onGenerate}
            className="
              flex-1
              py-4 rounded-2xl
              bg-gradient-to-r
              from-cyan-500
              to-blue-500
              text-white
              font-semibold
              text-lg
              hover:opacity-90
              hover:scale-[1.01]
              transition-all duration-300
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
                text-slate-950
                font-semibold
                text-lg
                hover:bg-yellow-400
                hover:scale-[1.01]
                transition-all duration-300
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
                bg-slate-900
                text-white
                font-semibold
                text-lg
                hover:bg-slate-800
                hover:scale-[1.01]
                transition-all duration-300
                shadow-lg shadow-slate-900/25
              "
            >
              Save Trip
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TripForm;