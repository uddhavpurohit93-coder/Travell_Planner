function PlanDisplay({ plan }) {
  if (!plan) return null;

  return (
    <div className="mt-4 p-4 bg-gray-100 rounded">

      {/* 🔥 DAY PLAN CARDS */}
      {plan.dayPlan.map((d, i) => (
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

            {/* ⭐ RATING + 📍 DISTANCE */}
            <p className="text-sm text-gray-500 mt-1">
              ⭐ {d.rating || "4.5"} | 📍 {d.distance || "2.0"} km
            </p>
          </div>
        </div>
      ))}

      {/* 🏨 HOTEL */}
      <p className="mt-3 font-semibold text-lg">
        🏨 {plan.hotel}
      </p>

      {/* 💰 BUDGET */}
      <div className="text-sm mt-2 text-gray-700">
        <p>💰 Hotel: ₹{Math.round(plan.breakdown.hotel)}</p>
        <p>🍽 Food: ₹{Math.round(plan.breakdown.food)}</p>
        <p>🚗 Travel: ₹{Math.round(plan.breakdown.travel)}</p>
      </div>

    </div>
  );
}

export default PlanDisplay;