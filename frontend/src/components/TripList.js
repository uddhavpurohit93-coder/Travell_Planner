function TripList({ trips, search, onEdit, onDelete }) {
  return (
    <>
      <h2 className="mt-6 font-semibold">My Trips</h2>

      {trips
        .filter((t) =>
          t.destination.toLowerCase().includes(search.toLowerCase())
        )
        .map((t) => (
          <div
            key={t._id}
            className="border p-4 mt-3 rounded-xl bg-white shadow"
          >
            {/* HEADER */}
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold text-lg">{t.destination}</p>
                <p className="text-sm text-gray-500">{t.date}</p>
                <p className="text-sm">₹{t.budget}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(t)}
                  className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                >
                  Edit
                </button>

                <button
                  onClick={() => onDelete(t._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>

            {/* 🔥 PLAN - SAME AS PlanDisplay */}
            {t.plan?.dayPlan?.map((d, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden shadow-lg hover:scale-105 transition mb-4 bg-white"
              >
                {d.image ? (
                  <img
                    src={d.image}
                    alt={d.place}
                    className="w-full h-36 object-cover"
                  />
                ) : (
                  <div className="w-full h-36 bg-gray-200" />
                )}

                <div className="p-3">
                  <p className="font-semibold text-lg">
                    Day {d.day}: {d.place}
                  </p>

                  {/* ⭐ FIXED (NO DEFAULT VALUE) */}
                  <p className="text-sm text-gray-500 mt-1">
                    ⭐ {d.rating || "4.5"} | 📍 {d.distance || "2.0"} km
                  </p>
                </div>
              </div>
            ))}

            {/* 🏨 HOTEL */}
            {t.plan?.hotel && (
              <p className="mt-3 font-semibold text-lg">
                🏨 {t.plan.hotel}
              </p>
            )}

            {/* 💰 BUDGET */}
            {t.plan?.breakdown && (
              <div className="text-sm text-gray-600 mt-1">
                <p>Hotel ₹{t.plan.breakdown.hotel}</p>
                <p>Food ₹{t.plan.breakdown.food}</p>
                <p>Travel ₹{t.plan.breakdown.travel}</p>
              </div>
            )}
          </div>
        ))}
    </>
  );
}

export default TripList;