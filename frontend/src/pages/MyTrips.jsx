import { useState } from "react";

const dummyTrips = [
  {
    id: 1,
    destination: "Goa",
    date: "2026-06-15",
    budget: 15000,
    days: 3,
    status: "Upcoming",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=500",
    hotel: "Goa Luxury Resort",
    breakdown: { hotel: 7500, food: 4500, travel: 3000 },
    places: ["Baga Beach", "Dudhsagar Falls", "Anjuna Market"]
  },
  {
    id: 2,
    destination: "Manali",
    date: "2026-07-20",
    budget: 20000,
    days: 5,
    status: "Upcoming",
    image: "https://static.toiimg.com/thumb/msid-115938847,width-1070,height-580,resizemode-75/115938847,pt-32,y_pad-40/115938847.jpg",
    hotel: "Manali 3 Star Hotel",
    breakdown: { hotel: 10000, food: 6000, travel: 4000 },
    places: ["Rohtang Pass", "Solang Valley", "Hadimba Temple"]
  },
  {
    id: 3,
    destination: "Jaipur",
    date: "2026-03-10",
    budget: 12000,
    days: 4,
    status: "Completed",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=500",
    hotel: "Jaipur Heritage Hotel",
    breakdown: { hotel: 6000, food: 3600, travel: 2400 },
    places: ["Amber Fort", "Hawa Mahal", "City Palace"]
  },
  {
    id: 4,
    destination: "Kerala",
    date: "2026-09-05",
    budget: 18000,
    days: 6,
    status: "Upcoming",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=500",
    hotel: "Kerala Backwater Resort",
    breakdown: { hotel: 9000, food: 5400, travel: 3600 },
    places: ["Alleppey", "Munnar", "Kovalam Beach"]
  },
  {
    id: 5,
    destination: "Agra",
    date: "2026-01-20",
    budget: 8000,
    days: 2,
    status: "Completed",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=500",
    hotel: "Agra Budget Stay",
    breakdown: { hotel: 4000, food: 2400, travel: 1600 },
    places: ["Taj Mahal", "Agra Fort", "Mehtab Bagh"]
  },
  {
    id: 6,
    destination: "Mumbai",
    date: "2026-10-12",
    budget: 14000,
    days: 4,
    status: "Upcoming",
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=500",
    hotel: "Mumbai 3 Star Hotel",
    breakdown: { hotel: 7000, food: 4200, travel: 2800 },
    places: ["Gateway of India", "Marine Drive", "Elephanta Caves"]
  }
];

function MyTrips() {

  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("All");

  const filtered = dummyTrips.filter(trip =>
    filter === "All" ? true : trip.status === filter
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#071120] 
                    via-[#0a1b3d] to-[#09152a] text-white p-8">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-5xl font-bold">My Trips ✈️</h1>
        <p className="text-gray-400 mt-2">
          Your planned journeys & adventures
        </p>
      </div>

      {/* STATS ROW */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

        <div className="bg-white/10 rounded-2xl p-4 text-center">
          <p className="text-3xl font-bold text-blue-400">
            {dummyTrips.length}
          </p>
          <p className="text-gray-400 text-sm mt-1">Total Trips</p>
        </div>

        <div className="bg-white/10 rounded-2xl p-4 text-center">
          <p className="text-3xl font-bold text-green-400">
            ₹{dummyTrips.reduce((a, t) => a + t.budget, 0).toLocaleString()}
          </p>
          <p className="text-gray-400 text-sm mt-1">Total Budget</p>
        </div>

        <div className="bg-white/10 rounded-2xl p-4 text-center">
          <p className="text-3xl font-bold text-yellow-400">
            {dummyTrips.filter(t => t.status === "Upcoming").length}
          </p>
          <p className="text-gray-400 text-sm mt-1">Upcoming</p>
        </div>

        <div className="bg-white/10 rounded-2xl p-4 text-center">
          <p className="text-3xl font-bold text-purple-400">
            {dummyTrips.filter(t => t.status === "Completed").length}
          </p>
          <p className="text-gray-400 text-sm mt-1">Completed</p>
        </div>

      </div>

      {/* FILTER BUTTONS */}
      <div className="flex gap-3 mb-6">
        {["All", "Upcoming", "Completed"].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-5 py-2 rounded-xl font-medium transition-all ${
              filter === f
                ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                : "bg-white/10 text-gray-300 hover:bg-white/20"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* TRIPS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map(trip => (
          <div
            key={trip.id}
            onClick={() => setSelected(trip)}
            className="bg-white/10 rounded-3xl overflow-hidden cursor-pointer
                       border border-white/10 hover:border-blue-500/50
                       hover:scale-105 transition-all duration-300
                       shadow-xl hover:shadow-blue-500/20"
          >
            {/* IMAGE */}
            <div className="relative">
              <img
                src={trip.image}
                alt={trip.destination}
                className="w-full h-48 object-cover"
              />
              {/* STATUS BADGE */}
              <span className={`absolute top-3 right-3 px-3 py-1 
                               rounded-full text-xs font-bold ${
                trip.status === "Upcoming"
                  ? "bg-green-500/90 text-white"
                  : "bg-gray-500/90 text-white"
              }`}>
                {trip.status === "Upcoming" ? "🟢" : "✅"} {trip.status}
              </span>
            </div>

            {/* CONTENT */}
            <div className="p-5">

              <h2 className="text-xl font-bold">{trip.destination}</h2>

              <div className="flex gap-4 mt-2 text-gray-400 text-sm">
                <span>📅 {trip.date}</span>
                <span>🌙 {trip.days} Days</span>
              </div>

              {/* BUDGET BAR */}
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Budget</span>
                  <span className="text-green-400 font-bold">
                    ₹{trip.budget.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full"
                    style={{ width: `${Math.min((trip.budget / 20000) * 100, 100)}%` }}
                  />
                </div>
              </div>

              {/* PLACES */}
              <div className="flex flex-wrap gap-2 mt-4">
                {trip.places.slice(0, 2).map((place, i) => (
                  <span key={i}
                    className="bg-blue-500/20 text-blue-300 
                               px-3 py-1 rounded-full text-xs">
                    📍 {place}
                  </span>
                ))}
                {trip.places.length > 2 && (
                  <span className="bg-white/10 text-gray-400 
                                   px-3 py-1 rounded-full text-xs">
                    +{trip.places.length - 2} more
                  </span>
                )}
              </div>

              {/* VIEW BUTTON */}
              <button className="mt-4 w-full bg-blue-500/20 hover:bg-blue-500 
                                 text-blue-300 hover:text-white
                                 border border-blue-500/30 hover:border-blue-500
                                 py-2 rounded-xl text-sm font-medium
                                 transition-all duration-200">
                View Details →
              </button>

            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/80 z-50 
                        flex items-center justify-center p-4"
             onClick={() => setSelected(null)}>

          <div className="bg-[#0a1b3d] rounded-3xl p-6 max-w-lg w-full
                          border border-white/10 shadow-2xl
                          max-h-[90vh] overflow-y-auto relative"
               onClick={e => e.stopPropagation()}>

            {/* CLOSE */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 bg-red-500 hover:bg-red-600
                         w-9 h-9 rounded-full font-bold transition-all">
              ✕
            </button>

            {/* IMAGE */}
            <img
              src={selected.image}
              alt={selected.destination}
              className="w-full h-52 object-cover rounded-2xl mb-5"
            />

            {/* INFO */}
            <h2 className="text-3xl font-bold">{selected.destination}</h2>

            <div className="flex gap-4 mt-2 text-gray-400 text-sm">
              <span>📅 {selected.date}</span>
              <span>🌙 {selected.days} Days</span>
              <span className={selected.status === "Upcoming"
                ? "text-green-400" : "text-gray-400"}>
                {selected.status === "Upcoming" ? "🟢" : "✅"} {selected.status}
              </span>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-3 mt-5">
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <p className="text-gray-400 text-xs">Hotel</p>
                <p className="text-blue-400 font-bold">
                  ₹{selected.breakdown.hotel.toLocaleString()}
                </p>
              </div>
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <p className="text-gray-400 text-xs">Food</p>
                <p className="text-green-400 font-bold">
                  ₹{selected.breakdown.food.toLocaleString()}
                </p>
              </div>
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <p className="text-gray-400 text-xs">Travel</p>
                <p className="text-yellow-400 font-bold">
                  ₹{selected.breakdown.travel.toLocaleString()}
                </p>
              </div>
            </div>

            {/* HOTEL */}
            <div className="mt-4 bg-white/5 rounded-xl p-4">
              <p className="text-gray-400 text-sm">🏨 Hotel</p>
              <p className="text-white font-semibold mt-1">{selected.hotel}</p>
            </div>

            {/* PLACES */}
            <div className="mt-4 bg-white/5 rounded-xl p-4">
              <p className="text-gray-400 text-sm mb-2">📍 Places to Visit</p>
              <div className="flex flex-wrap gap-2">
                {selected.places.map((place, i) => (
                  <span key={i}
                    className="bg-blue-500/20 text-blue-300
                               px-3 py-1 rounded-full text-sm">
                    {place}
                  </span>
                ))}
              </div>
            </div>

            {/* TOTAL */}
            <div className="mt-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20
                            rounded-xl p-4 flex justify-between items-center
                            border border-blue-500/20">
              <p className="text-gray-300 font-medium">Total Budget</p>
              <p className="text-2xl font-bold text-green-400">
                ₹{selected.budget.toLocaleString()}
              </p>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default MyTrips;