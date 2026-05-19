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
    places: ["Baga Beach", "Dudhsagar Falls", "Anjuna Market"],
  },
  {
    id: 2,
    destination: "Manali",
    date: "2026-07-20",
    budget: 20000,
    days: 5,
    status: "Upcoming",
    image:
      "https://static.toiimg.com/thumb/msid-115938847,width-1070,height-580,resizemode-75/115938847,pt-32,y_pad-40/115938847.jpg",
    hotel: "Manali 3 Star Hotel",
    breakdown: { hotel: 10000, food: 6000, travel: 4000 },
    places: ["Rohtang Pass", "Solang Valley", "Hadimba Temple"],
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
    places: ["Amber Fort", "Hawa Mahal", "City Palace"],
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
    places: ["Alleppey", "Munnar", "Kovalam Beach"],
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
    places: ["Taj Mahal", "Agra Fort", "Mehtab Bagh"],
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
    places: ["Gateway of India", "Marine Drive", "Elephanta Caves"],
  },
];

function MyTrips() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("All");

  const filtered = dummyTrips.filter((trip) =>
    filter === "All" ? true : trip.status === filter
  );

  return (
    <div
      className="min-h-screen text-slate-900 p-8 bg-fixed bg-cover bg-center relative"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.90), rgba(255,255,255,0.96)), url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80')",
      }}
    >
     

      {/* STATS ROW */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 relative z-10">
        <div className="bg-white/90 backdrop-blur-md border border-slate-200 rounded-2xl p-5 text-center shadow-[0_12px_35px_rgba(15,23,42,0.10)] hover:shadow-[0_18px_45px_rgba(59,130,246,0.18)] transition-all hover:-translate-y-1">
          <p className="text-3xl font-black text-blue-500">
            {dummyTrips.length}
          </p>
          <p className="text-slate-500 text-sm mt-1">Total Trips</p>
        </div>

        <div className="bg-white/90 backdrop-blur-md border border-slate-200 rounded-2xl p-5 text-center shadow-[0_12px_35px_rgba(15,23,42,0.10)] hover:shadow-[0_18px_45px_rgba(34,197,94,0.18)] transition-all hover:-translate-y-1">
          <p className="text-3xl font-black text-green-500">
            ₹{dummyTrips.reduce((a, t) => a + t.budget, 0).toLocaleString()}
          </p>
          <p className="text-slate-500 text-sm mt-1">Total Budget</p>
        </div>

        <div className="bg-white/90 backdrop-blur-md border border-slate-200 rounded-2xl p-5 text-center shadow-[0_12px_35px_rgba(15,23,42,0.10)] hover:shadow-[0_18px_45px_rgba(234,179,8,0.18)] transition-all hover:-translate-y-1">
          <p className="text-3xl font-black text-yellow-500">
            {dummyTrips.filter((t) => t.status === "Upcoming").length}
          </p>
          <p className="text-slate-500 text-sm mt-1">Upcoming</p>
        </div>

        <div className="bg-white/90 backdrop-blur-md border border-slate-200 rounded-2xl p-5 text-center shadow-[0_12px_35px_rgba(15,23,42,0.10)] hover:shadow-[0_18px_45px_rgba(168,85,247,0.18)] transition-all hover:-translate-y-1">
          <p className="text-3xl font-black text-purple-500">
            {dummyTrips.filter((t) => t.status === "Completed").length}
          </p>
          <p className="text-slate-500 text-sm mt-1">Completed</p>
        </div>
      </div>

      {/* FILTER BUTTONS */}
      <div className="flex gap-3 mb-6 relative z-10">
        {["All", "Upcoming", "Completed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-5 py-2 rounded-xl font-bold transition-all ${
              filter === f
                ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25"
                : "bg-white/90 backdrop-blur-md border border-slate-200 text-slate-600 hover:border-cyan-300 hover:text-cyan-500 shadow-[0_8px_22px_rgba(15,23,42,0.08)]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* TRIPS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 relative z-10">
        {filtered.map((trip) => (
          <div
            key={trip.id}
            onClick={() => setSelected(trip)}
            className="bg-white/95 backdrop-blur-md rounded-3xl overflow-hidden cursor-pointer border border-slate-200 hover:-translate-y-1 transition-all duration-300 shadow-[0_16px_45px_rgba(15,23,42,0.14)] hover:shadow-[0_24px_60px_rgba(59,130,246,0.22)]"
          >
            <div className="relative overflow-hidden">
              <img
                src={trip.image}
                alt={trip.destination}
                className="w-full h-48 object-cover transition-transform duration-700 hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

              <span
                className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold shadow-[0_8px_20px_rgba(0,0,0,0.25)] ${
                  trip.status === "Upcoming"
                    ? "bg-green-500 text-white"
                    : "bg-slate-600 text-white"
                }`}
              >
                {trip.status === "Upcoming" ? "🟢" : "✅"} {trip.status}
              </span>
            </div>

            <div className="p-5">
              <h2 className="text-xl font-black text-slate-900">
                {trip.destination}
              </h2>

              <div className="flex gap-4 mt-2 text-slate-500 text-sm">
                <span>📅 {trip.date}</span>
                <span>🌙 {trip.days} Days</span>
              </div>

              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-500">Budget</span>
                  <span className="text-green-500 font-bold">
                    ₹{trip.budget.toLocaleString()}
                  </span>
                </div>

                <div className="w-full bg-slate-100 rounded-full h-2 shadow-inner">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full shadow-[0_4px_12px_rgba(14,165,233,0.35)]"
                    style={{
                      width: `${Math.min((trip.budget / 20000) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {trip.places.slice(0, 2).map((place, i) => (
                  <span
                    key={i}
                    className="bg-white text-blue-600 px-3 py-1 rounded-full text-xs font-semibold border border-blue-100 shadow-[0_6px_16px_rgba(59,130,246,0.12)]"
                  >
                    📍 {place}
                  </span>
                ))}

                {trip.places.length > 2 && (
                  <span className="bg-white text-slate-500 px-3 py-1 rounded-full text-xs border border-slate-200 shadow-[0_6px_16px_rgba(15,23,42,0.08)]">
                    +{trip.places.length - 2} more
                  </span>
                )}
              </div>

              <button className="mt-4 w-full bg-blue-50 hover:bg-blue-500 text-blue-600 hover:text-white border border-blue-100 hover:border-blue-500 py-2 rounded-xl text-sm font-bold transition-all shadow-[0_8px_22px_rgba(59,130,246,0.10)] hover:shadow-[0_12px_28px_rgba(59,130,246,0.25)]">
                View Details →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-3xl p-6 max-w-lg w-full border border-slate-200 shadow-2xl max-h-[90vh] overflow-y-auto relative text-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white w-9 h-9 rounded-full font-bold transition-all shadow-[0_8px_20px_rgba(239,68,68,0.35)]"
            >
              ✕
            </button>

            <img
              src={selected.image}
              alt={selected.destination}
              className="w-full h-52 object-cover rounded-2xl mb-5 shadow-[0_12px_35px_rgba(15,23,42,0.18)]"
            />

            <h2 className="text-3xl font-black">{selected.destination}</h2>

            <div className="flex gap-4 mt-2 text-slate-500 text-sm">
              <span>📅 {selected.date}</span>
              <span>🌙 {selected.days} Days</span>
              <span
                className={
                  selected.status === "Upcoming"
                    ? "text-green-500"
                    : "text-slate-500"
                }
              >
                {selected.status === "Upcoming" ? "🟢" : "✅"}{" "}
                {selected.status}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-5">
              <div className="bg-white rounded-xl p-3 text-center border border-slate-200 shadow-[0_8px_22px_rgba(15,23,42,0.08)]">
                <p className="text-slate-500 text-xs">Hotel</p>
                <p className="text-blue-500 font-bold">
                  ₹{selected.breakdown.hotel.toLocaleString()}
                </p>
              </div>

              <div className="bg-white rounded-xl p-3 text-center border border-slate-200 shadow-[0_8px_22px_rgba(15,23,42,0.08)]">
                <p className="text-slate-500 text-xs">Food</p>
                <p className="text-green-500 font-bold">
                  ₹{selected.breakdown.food.toLocaleString()}
                </p>
              </div>

              <div className="bg-white rounded-xl p-3 text-center border border-slate-200 shadow-[0_8px_22px_rgba(15,23,42,0.08)]">
                <p className="text-slate-500 text-xs">Travel</p>
                <p className="text-yellow-500 font-bold">
                  ₹{selected.breakdown.travel.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="mt-4 bg-white rounded-xl p-4 border border-slate-200 shadow-[0_8px_22px_rgba(15,23,42,0.08)]">
              <p className="text-slate-500 text-sm">🏨 Hotel</p>
              <p className="text-slate-900 font-semibold mt-1">
                {selected.hotel}
              </p>
            </div>

            <div className="mt-4 bg-white rounded-xl p-4 border border-slate-200 shadow-[0_8px_22px_rgba(15,23,42,0.08)]">
              <p className="text-slate-500 text-sm mb-2">📍 Places to Visit</p>

              <div className="flex flex-wrap gap-2">
                {selected.places.map((place, i) => (
                  <span
                    key={i}
                    className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm border border-blue-100 shadow-[0_6px_16px_rgba(59,130,246,0.12)]"
                  >
                    {place}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 flex justify-between items-center border border-blue-100 shadow-[0_10px_28px_rgba(14,165,233,0.14)]">
              <p className="text-slate-600 font-medium">Total Budget</p>
              <p className="text-2xl font-black text-green-500">
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