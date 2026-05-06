function PlanDisplay({ plan }) {

  if (!plan) return null;

  return (

    <div className="space-y-6">

      {/* DAY PLANS */}
      <div className="grid md:grid-cols-2 gap-5">

        {plan.dayPlan.map((d, i) => (

          <div
            key={i}
            className="bg-white/10 border border-white/10 rounded-3xl overflow-hidden shadow-xl hover:scale-[1.02] transition duration-300"
          >

            {/* IMAGE */}
            {d.image ? (
              <img
                src={d.image}
                alt={d.place}
                className="w-full h-52 object-cover"
              />
            ) : (
              <div className="w-full h-52 bg-gray-700" />
            )}

            {/* CONTENT */}
            <div className="p-5">

              <h2 className="text-2xl font-bold">
                Day {d.day}
              </h2>

              <p className="text-lg text-gray-300 mt-1">
                📍 {d.place}
              </p>

              <div className="flex gap-4 mt-3 text-sm text-gray-400">

                <p>
                  ⭐ {d.rating || "4.5"}
                </p>

                <p>
                  📍 {d.distance || "2.0"} km
                </p>

              </div>

            </div>

          </div>
        ))}

      </div>

      {/* HOTEL */}
      <div className="bg-white/10 border border-white/10 rounded-3xl p-5">

        <h2 className="text-2xl font-bold mb-2">
          🏨 Recommended Hotel
        </h2>

        <p className="text-gray-300">
          {plan.hotel}
        </p>

      </div>

      {/* BUDGET */}
      <div className="grid md:grid-cols-3 gap-4">

        <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
          <p className="text-gray-300">Hotel</p>
          <h2 className="text-2xl font-bold">
            ₹{Math.round(plan.breakdown.hotel)}
          </h2>
        </div>

        <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
          <p className="text-gray-300">Food</p>
          <h2 className="text-2xl font-bold">
            ₹{Math.round(plan.breakdown.food)}
          </h2>
        </div>

        <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
          <p className="text-gray-300">Travel</p>
          <h2 className="text-2xl font-bold">
            ₹{Math.round(plan.breakdown.travel)}
          </h2>
        </div>

      </div>

    </div>
  );
}

export default PlanDisplay; 