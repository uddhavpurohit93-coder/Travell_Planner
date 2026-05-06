function TripList({ trips, search, onEdit, onDelete }) {

  return (

    <div>

      {/* GRID */}
      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-8 items-start">

        {trips
          .filter((t) =>
            t.destination.toLowerCase().includes(search.toLowerCase())
          )
          .map((t) => (

            <div
              key={t._id}
              className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl hover:-translate-y-2 hover:shadow-blue-500/20 transition-all duration-500 h-fit"
            >

              {/* HEADER */}
              <div className="p-6 flex justify-between items-start border-b border-white/10">

                <div>

                  <h2 className="text-3xl font-bold capitalize text-white">
                    {t.destination}
                  </h2>

                  <p className="text-gray-300 mt-2 flex items-center gap-2">
                    📅 {t.date}
                  </p>

                  <p className="text-green-300 mt-2 text-xl font-bold">
                    ₹{t.budget}
                  </p>

                </div>

                {/* ACTION BUTTONS */}
                <div className="flex gap-3">

                  <button
                    onClick={() => onEdit(t)}
                    className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-xl font-semibold transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(t._id)}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl font-semibold transition"
                  >
                    Delete
                  </button>

                </div>

              </div>

              {/* DAY PLANS */}
              <div className="p-5 space-y-6">

                {t.plan?.dayPlan?.map((d, i) => (

                  <div
                    key={i}
                    className="bg-black/20 rounded-3xl overflow-hidden border border-white/10 hover:scale-[1.02] transition duration-300"
                  >

                    {/* IMAGE */}
                    <div className="relative">

                      {d.image ? (
                        <img
                          src={d.image}
                          alt={d.place}
                          className="w-full h-64 object-cover"
                        />
                      ) : (
                        <div className="w-full h-64 bg-gray-700" />
                      )}

                      {/* OVERLAY */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

                      {/* DAY TITLE */}
                      <div className="absolute bottom-4 left-4">

                        <h2 className="text-2xl font-bold text-white">
                          Day {d.day}
                        </h2>

                        <p className="text-gray-200 text-lg">
                          {d.place}
                        </p>

                      </div>

                    </div>

                    {/* INFO */}
                    <div className="p-4 flex gap-6 text-gray-300 text-sm">

                      <p className="flex items-center gap-1">
                        ⭐ {d.rating || "4.5"}
                      </p>

                      <p className="flex items-center gap-1">
                        📍 {d.distance || "2.0"} km
                      </p>

                    </div>

                  </div>
                ))}

              </div>

              {/* HOTEL SECTION */}
              {t.plan?.hotel && (

                <div className="mx-5 mb-5 p-5 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-white/10">

                  <h2 className="text-2xl font-bold mb-4">
                    🏨 {t.plan.hotel}
                  </h2>

                  {/* BREAKDOWN */}
                  {t.plan?.breakdown && (

                    <div className="grid grid-cols-3 gap-4 text-center">

                      <div className="bg-black/20 rounded-2xl p-4">
                        <p className="text-gray-300 text-sm">
                          Hotel
                        </p>

                        <h3 className="text-xl font-bold text-green-300 mt-1">
                          ₹{t.plan.breakdown.hotel}
                        </h3>
                      </div>

                      <div className="bg-black/20 rounded-2xl p-4">
                        <p className="text-gray-300 text-sm">
                          Food
                        </p>

                        <h3 className="text-xl font-bold text-pink-300 mt-1">
                          ₹{t.plan.breakdown.food}
                        </h3>
                      </div>

                      <div className="bg-black/20 rounded-2xl p-4">
                        <p className="text-gray-300 text-sm">
                          Travel
                        </p>

                        <h3 className="text-xl font-bold text-blue-300 mt-1">
                          ₹{t.plan.breakdown.travel}
                        </h3>
                      </div>

                    </div>
                  )}

                </div>
              )}

            </div>
          ))}

      </div>

    </div>
  );
}

export default TripList;