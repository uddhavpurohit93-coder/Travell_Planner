import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaWallet,
  FaClock
} from "react-icons/fa";

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

  return (

    <div className="space-y-8">

      {/* HEADER */}
      <div>

        <h2 className="text-4xl font-bold">
          Plan Your Journey ✈️
        </h2>

        <p className="text-gray-300 mt-2">
          Create smart travel plans with AI assistance
        </p>

      </div>

      {/* FORM GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* DESTINATION */}
        <div>

          <label className="text-sm text-gray-300 mb-2 flex items-center gap-2">
            <FaMapMarkerAlt />
            Destination
          </label>

          <input
            placeholder="Enter destination..."
            className="w-full p-5 rounded-3xl bg-white/10 border border-white/10 backdrop-blur-md outline-none focus:border-cyan-400 focus:bg-white/15 transition-all duration-300 text-lg"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />

        </div>

        {/* DATE */}
        <div>

          <label className="text-sm text-gray-300 mb-2 flex items-center gap-2">
            <FaCalendarAlt />
            Travel Date
          </label>

          <input
            type="date"
            className="w-full p-5 rounded-3xl bg-white/10 border border-white/10 backdrop-blur-md outline-none focus:border-blue-400 focus:bg-white/15 transition-all duration-300 text-lg"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

        </div>

        {/* BUDGET */}
        <div>

          <label className="text-sm text-gray-300 mb-2 flex items-center gap-2">
            <FaWallet />
            Budget
          </label>

          <input
            placeholder="Enter budget..."
            className="w-full p-5 rounded-3xl bg-white/10 border border-white/10 backdrop-blur-md outline-none focus:border-green-400 focus:bg-white/15 transition-all duration-300 text-lg"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />

        </div>

        {/* DAYS */}
        <div>

          <label className="text-sm text-gray-300 mb-2 flex items-center gap-2">
            <FaClock />
            Days
          </label>

          <input
            placeholder="Number of days..."
            className="w-full p-5 rounded-3xl bg-white/10 border border-white/10 backdrop-blur-md outline-none focus:border-pink-400 focus:bg-white/15 transition-all duration-300 text-lg"
            value={days}
            onChange={(e) => setDays(e.target.value)}
          />

        </div>

      </div>

      {/* ACTION BUTTONS */}
      <div className="flex flex-col md:flex-row gap-4 pt-2">

        {editMode ? (

          <button
            onClick={onUpdate}
            className="flex-1 py-5 rounded-3xl bg-gradient-to-r from-yellow-500 to-orange-500 hover:scale-[1.02] transition-all duration-300 font-bold text-lg shadow-2xl"
          >
            Update Trip ✏️
          </button>

        ) : (

          <button
            onClick={onSubmit}
            className="flex-1 py-5 rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-[1.02] transition-all duration-300 font-bold text-lg shadow-2xl"
          >
            Add Trip ✈️
          </button>

        )}

        <button
          onClick={onGenerate}
          className="flex-1 py-5 rounded-3xl bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-[1.02] transition-all duration-300 font-bold text-lg shadow-2xl"
        >
          Generate AI Plan 🚀
        </button>

      </div>

      {/* BOTTOM INFO */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-5 flex flex-col md:flex-row justify-between gap-4">

        <div>

          <p className="text-gray-400 text-sm">
            Smart Planning
          </p>

          <h3 className="text-xl font-bold mt-1">
            AI Powered Itinerary
          </h3>

        </div>

        <div>

          <p className="text-gray-400 text-sm">
            Personalized Travel
          </p>

          <h3 className="text-xl font-bold mt-1">
            Luxury Experience 🌍
          </h3>

        </div>

      </div>

    </div>
  );
}

export default TripForm;