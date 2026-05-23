function UpcomingTrips({ trips, onView }) {

  return (

    <div>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">

        <div>

          <div className="flex justify-between items-center mb-6">

            <div>
              <h2 className="text-3xl font-bold">
                Upcoming Trips 📅
              </h2>

              <p className="text-gray-400 mt-1">
                Your planned journeys & adventures
              </p>
            </div>

            <button
              onClick={() => {
                window.scrollTo({
                  top: 1600,
                  behavior: "smooth"
                });
              }}
              className="px-5 py-3 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/20 transition"
            >
              Manage Trips
            </button>

          </div>

          <p className="text-gray-300 mt-2">
            Your planned journeys & adventures
          </p>

        </div>

        <button className="hidden md:block px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 transition border border-white/10">
          Manage Trips
        </button>

      </div>

      {/* EMPTY STATE */}
      {trips.length === 0 ? (

        <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-10 rounded-[30px] text-center">

          <h2 className="text-3xl font-bold">
            No Upcoming Trips ✈️
          </h2>

          <p className="text-gray-300 mt-3">
            Start planning your next adventure
          </p>

        </div>

      ) : (

        <div className="space-y-6">

          {trips.map((trip, index) => (

            <div
              key={trip._id}
              className="relative bg-white/10 backdrop-blur-xl border border-white/10 p-6 rounded-[30px] overflow-hidden hover:-translate-y-1 hover:border-cyan-400/30 transition-all duration-500"
            >

              {/* GLOW */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 blur-3xl rounded-full"></div>

              <div className="relative z-10 flex flex-col lg:flex-row justify-between lg:items-center gap-6">

                {/* LEFT */}
                <div className="flex items-start gap-5">

                  {/* NUMBER */}
                  <div className="min-w-[60px] h-[60px] rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-2xl font-bold shadow-xl">

                    {index + 1}

                  </div>

                  {/* INFO */}
                  <div>

                    <h2 className="text-3xl font-bold capitalize">
                      {trip.destination}
                    </h2>

                    <p className="text-gray-300 mt-2 flex items-center gap-2">
                      📅 {trip.date}
                    </p>

                    <div className="flex gap-3 mt-4 flex-wrap">

                      <span className="px-4 py-2 rounded-2xl bg-white/10 border border-white/10 text-sm">
                        ✈️ Planned
                      </span>

                      <span className="px-4 py-2 rounded-2xl bg-green-500/20 text-green-300 text-sm border border-green-500/20">
                        Ready To Explore
                      </span>

                    </div>

                  </div>

                </div>

                <div className="text-right">

                  <p className="text-green-300 font-bold text-xl">
                    ₹{trip.budget}
                  </p>

                  <p className="text-sm text-gray-400">
                    Planned Trip
                  </p>

                  <button
                    onClick={() => onView(trip)}
                    className="mt-3 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition text-sm font-semibold"
                  >
                    View Details 🚀
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default UpcomingTrips;