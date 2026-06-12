import { useState, useEffect } from "react";
import { MapPin, Calendar, Moon, Trash2, X, ExternalLink } from "lucide-react";

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
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, [userId, token]);

  const handleDelete = async (id, e) => {
    e?.stopPropagation();
    if (!window.confirm("Delete this trip?")) return;
    await fetch(`http://localhost:5000/api/delete-trip/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setTrips((prev) => prev.filter((t) => t._id !== id));
    if (selected?._id === id) setSelected(null);
  };

  const filtered = trips.filter((t) => filter === "All" || t.status === filter);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white p-8 relative overflow-hidden">

      {/* glowing background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.15),transparent_50%)]" />

      {/* HEADER */}
      <div className="relative z-10 mb-8">
        <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          My Trips 🗺️
        </h1>
        {user.name && (
          <p className="text-gray-400 mt-1">Welcome back, {user.name}</p>
        )}
      </div>

      {/* FILTER */}
      <div className="flex gap-3 mb-6 relative z-10">
        {["All", "Upcoming", "Completed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-5 py-2 rounded-xl font-bold transition-all border ${
              filter === f
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30"
                : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* LOADING */}
      {loading && (
        <div className="text-center text-gray-400 mt-20">
          Loading trips...
        </div>
      )}

      {/* EMPTY */}
      {!loading && trips.length === 0 && (
        <div className="text-center mt-20 text-gray-400">
          ✈️ No trips found
        </div>
      )}

      {/* CARDS */}
      {!loading && filtered.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 relative z-10">
          {filtered.map((trip) => (
            <div
              key={trip._id}
              onClick={() => setSelected(trip)}
              className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl hover:scale-[1.02] transition"
            >
              <img
                src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600"
                className="h-48 w-full object-cover"
              />

              <div className="p-5">
                <h2 className="text-xl font-bold">{trip.destination}</h2>

                <div className="text-gray-400 text-sm flex gap-3 mt-2">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} /> {trip.date?.slice(0, 10)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Moon size={14} /> {trip.days} Days
                  </span>
                </div>

                <div className="mt-4 text-green-400 font-bold">
                  ₹{trip.budget?.toLocaleString()}
                </div>

                <div className="flex gap-2 mt-4">
                  <button className="flex-1 bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-300 py-2 rounded-xl">
                    View
                  </button>

                  <button
                    onClick={(e) => handleDelete(trip._id, e)}
                    className="bg-red-500/20 hover:bg-red-500/40 text-red-400 px-3 rounded-xl"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-[#111827] border border-white/10 p-6 rounded-3xl w-full max-w-lg text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute right-6 top-6 text-gray-400"
            >
              <X />
            </button>

            <h2 className="text-2xl font-bold">{selected.destination}</h2>

            <p className="text-gray-400 mt-2">
              {selected.date?.slice(0, 10)} • {selected.days} Days
            </p>

            <div className="mt-4 text-green-400 text-xl font-bold">
              ₹{selected.budget?.toLocaleString()}
            </div>

            <button
              onClick={(e) => handleDelete(selected._id, e)}
              className="mt-6 w-full bg-red-500/20 hover:bg-red-500/40 text-red-400 py-3 rounded-xl"
            >
              Delete Trip
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyTrips;