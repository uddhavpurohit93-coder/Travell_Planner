import { useState, useEffect } from "react";
import { MapPin, Calendar, Moon, Trash2, X, ExternalLink } from "lucide-react";

// ── Get logged-in user from localStorage ─────────────────────────────────
function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem("travelUser") || "{}");
  } catch {
    return {};
  }
}

function MyTrips() {
  const [trips, setTrips] = useState([]);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const user = getCurrentUser();
  const userId = user.id || "default-user";
  const token = localStorage.getItem("travelToken") || "";

  // ── FETCH this user's trips ────────────────────────────────────────────
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/trips/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) {
          const formatted = data.data.map((t) => ({
            ...t,
            status: new Date(t.date) >= new Date() ? "Upcoming" : "Completed",
          }));
          setTrips(formatted);
        }
      } catch (err) {
        console.log("MyTrips fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, [userId, token]);

  // ── DELETE ────────────────────────────────────────────────────────────
  const handleDelete = async (id, e) => {
    e?.stopPropagation();
    if (!window.confirm("Delete this trip?")) return;
    try {
      await fetch(`http://localhost:5000/api/delete-trip/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setTrips((prev) => prev.filter((t) => t._id !== id));
      if (selected?._id === id) setSelected(null);
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  // ── Helpers ────────────────────────────────────────────────────────────
  const getDestinationImage = (dest) => {
    const images = {
      goa: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=500",
      manali: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=500",
      jaipur: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=500",
      kerala: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=500",
      mumbai: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=500",
      delhi: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=500",
      agra: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=500",
      bali: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=500",
      dubai: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=500",
      maldives: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500",
      udaipur: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?w=500",
    };
    const key = dest?.toLowerCase();
    const matched = Object.entries(images).find(([city]) => key?.includes(city));
    return matched ? matched[1] : "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=500";
  };

  const getBreakdown = (trip) => {
    if (trip?.plan?.breakdown) return trip.plan.breakdown;
    const b = trip.budget || 0;
    return { hotel: Math.round(b * 0.5), food: Math.round(b * 0.3), travel: Math.round(b * 0.2) };
  };

  const getHotelName = (trip) => {
    if (trip?.plan?.hotels?.length > 0) return trip.plan.hotels[0]?.name || "Hotel";
    if (trip?.hotels?.length > 0) return trip.hotels[0]?.name || "Hotel";
    return "Hotel info unavailable";
  };

  const getDayPlaces = (trip) => {
    if (trip?.plan?.dayPlan?.length > 0) {
      return trip.plan.dayPlan.map((d) => d.place).filter(Boolean).slice(0, 4);
    }
    return [];
  };

  const filtered = trips.filter((t) => filter === "All" || t.status === filter);

  return (
    <div
      className="min-h-screen text-slate-900 p-8 bg-fixed bg-cover bg-center relative"
      style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.90), rgba(255,255,255,0.96)), url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80')" }}
    >
      {/* HEADER */}
      <div className="mb-8 relative z-10">
        <h1 className="text-4xl font-black text-slate-900">My Trips 🗺️</h1>
        {user.name && <p className="text-slate-500 mt-1">Welcome back, {user.name}!</p>}
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 relative z-10">
        {[
          { label: "Total Trips", value: trips.length, color: "text-blue-500" },
          { label: "Total Budget", value: `₹${trips.reduce((a, t) => a + (t.budget || 0), 0).toLocaleString()}`, color: "text-green-500" },
          { label: "Upcoming", value: trips.filter((t) => t.status === "Upcoming").length, color: "text-yellow-500" },
          { label: "Completed", value: trips.filter((t) => t.status === "Completed").length, color: "text-purple-500" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white/90 backdrop-blur-md border border-slate-200 rounded-2xl p-5 text-center shadow-[0_12px_35px_rgba(15,23,42,0.10)] hover:-translate-y-1 transition-all">
            <p className={`text-3xl font-black ${color}`}>{value}</p>
            <p className="text-slate-500 text-sm mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* FILTER */}
      <div className="flex gap-3 mb-6 relative z-10">
        {["All", "Upcoming", "Completed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-5 py-2 rounded-xl font-bold transition-all ${
              filter === f
                ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25"
                : "bg-white/90 backdrop-blur-md border border-slate-200 text-slate-600 hover:border-cyan-300 hover:text-cyan-500"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* LOADING */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-slate-500 mt-4">Loading your trips...</p>
          </div>
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && trips.length === 0 && (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <p className="text-6xl mb-4">✈️</p>
          <h3 className="text-2xl font-black text-slate-700">No trips found</h3>
          <p className="text-slate-500 mt-2">Go to the Home page and generate an AI Trip!</p>
        </div>
      )}

      {/* TRIPS GRID */}
      {!loading && filtered.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 relative z-10">
          {filtered.map((trip) => {
            const places = getDayPlaces(trip);
            return (
              <div
                key={trip._id}
                onClick={() => setSelected(trip)}
                className="bg-white/95 backdrop-blur-md rounded-3xl overflow-hidden cursor-pointer border border-slate-200 hover:-translate-y-1 transition-all duration-300 shadow-[0_16px_45px_rgba(15,23,42,0.14)] hover:shadow-[0_24px_60px_rgba(59,130,246,0.22)]"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={getDestinationImage(trip.destination)}
                    alt={trip.destination}
                    className="w-full h-48 object-cover transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                  <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold shadow-lg ${trip.status === "Upcoming" ? "bg-green-500 text-white" : "bg-slate-600 text-white"}`}>
                    {trip.status === "Upcoming" ? "🟢" : "✅"} {trip.status}
                  </span>
                </div>

                <div className="p-5">
                  <h2 className="text-xl font-black text-slate-900">{trip.destination}</h2>
                  <div className="flex gap-4 mt-2 text-slate-500 text-sm">
                    <span className="flex items-center gap-1"><Calendar size={13} /> {trip.date?.slice(0, 10)}</span>
                    <span className="flex items-center gap-1"><Moon size={13} /> {trip.days} Days</span>
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-500">Budget</span>
                      <span className="text-green-500 font-bold">₹{(trip.budget || 0).toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full" style={{ width: `${Math.min(((trip.budget || 0) / 20000) * 100, 100)}%` }} />
                    </div>
                  </div>

                  {places.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {places.slice(0, 2).map((place, i) => (
                        <span key={i} className="bg-white text-blue-600 px-3 py-1 rounded-full text-xs font-semibold border border-blue-100">
                          <MapPin size={10} className="inline mr-1" />{place}
                        </span>
                      ))}
                      {places.length > 2 && (
                        <span className="bg-white text-slate-500 px-3 py-1 rounded-full text-xs border border-slate-200">+{places.length - 2} more</span>
                      )}
                    </div>
                  )}

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelected(trip); }}
                      className="flex-1 bg-blue-50 hover:bg-blue-500 text-blue-600 hover:text-white border border-blue-100 hover:border-blue-500 py-2 rounded-xl text-sm font-bold transition-all"
                    >
                      View Details →
                    </button>
                    <button
                      onClick={(e) => handleDelete(trip._id, e)}
                      className="px-4 py-2 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white border border-red-100 rounded-xl text-sm font-bold transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* DETAIL MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full border border-slate-200 shadow-2xl max-h-[90vh] overflow-y-auto relative text-slate-900" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelected(null)} className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white w-9 h-9 rounded-full font-bold transition-all flex items-center justify-center">
              <X size={18} />
            </button>

            <img src={getDestinationImage(selected.destination)} alt={selected.destination} className="w-full h-52 object-cover rounded-2xl mb-5" />
            <h2 className="text-3xl font-black">{selected.destination}</h2>

            <div className="flex gap-4 mt-2 text-slate-500 text-sm flex-wrap">
              <span>📅 {selected.date?.slice(0, 10)}</span>
              <span>🌙 {selected.days} Days</span>
              <span className={selected.status === "Upcoming" ? "text-green-500" : "text-slate-500"}>
                {selected.status === "Upcoming" ? "🟢" : "✅"} {selected.status}
              </span>
            </div>

            {/* Budget breakdown */}
            <div className="grid grid-cols-3 gap-3 mt-5">
              {Object.entries(getBreakdown(selected)).map(([key, val]) => (
                <div key={key} className="bg-slate-50 rounded-xl p-3 text-center border border-slate-200">
                  <p className="text-slate-500 text-xs capitalize">{key}</p>
                  <p className="text-blue-500 font-bold">₹{val?.toLocaleString()}</p>
                </div>
              ))}
            </div>

            {/* Hotel */}
            <div className="mt-4 bg-slate-50 rounded-xl p-4 border border-slate-200">
              <p className="text-slate-500 text-sm">🏨 Hotel</p>
              <p className="text-slate-900 font-semibold mt-1">{getHotelName(selected)}</p>
            </div>

            {/* Day Plan */}
            {getDayPlaces(selected).length > 0 && (
              <div className="mt-4 bg-slate-50 rounded-xl p-4 border border-slate-200">
                <p className="text-slate-500 text-sm mb-2">📍 Places to Visit</p>
                <div className="flex flex-wrap gap-2">
                  {getDayPlaces(selected).map((place, i) => (
                    <span key={i} className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm border border-blue-100">{place}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Food Recommendations */}
            {selected?.plan?.foodRecommendations?.length > 0 && (
              <div className="mt-4 bg-slate-50 rounded-xl p-4 border border-slate-200">
                <p className="text-slate-500 text-sm mb-2">🍽️ Food Recommendations</p>
                <div className="flex flex-wrap gap-2">
                  {selected.plan.foodRecommendations.slice(0, 4).map((food, i) => (
                    <span key={i} className="bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-sm border border-orange-100">
                      {typeof food === "string" ? food : food.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Hidden Gems */}
            {selected?.plan?.hiddenGems?.length > 0 && (
              <div className="mt-4 bg-slate-50 rounded-xl p-4 border border-slate-200">
                <p className="text-slate-500 text-sm mb-2">💎 Hidden Gems</p>
                <div className="flex flex-wrap gap-2">
                  {selected.plan.hiddenGems.slice(0, 3).map((gem, i) => (
                    <span key={i} className="bg-cyan-50 text-cyan-600 px-3 py-1 rounded-full text-sm border border-cyan-100">
                      {typeof gem === "string" ? gem : gem.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Total */}
            <div className="mt-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 flex justify-between items-center border border-blue-100">
              <p className="text-slate-600 font-medium">Total Budget</p>
              <p className="text-2xl font-black text-green-500">₹{(selected.budget || 0).toLocaleString()}</p>
            </div>

            <div className="flex gap-3 mt-4">
              <a
                href={`https://www.google.com/maps/search/${encodeURIComponent(selected.destination)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 bg-blue-50 hover:bg-blue-500 text-blue-600 hover:text-white border border-blue-100 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
              >
                View on Maps <ExternalLink size={15} />
              </a>
              <button
                onClick={(e) => handleDelete(selected._id, e)}
                className="flex-1 py-3 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white border border-red-100 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
              >
                <Trash2 size={15} /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyTrips;
