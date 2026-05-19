import {
  Calendar,
  MapPin,
  Pencil,
  Trash2,
  Star,
  Hotel,
  CloudSun
} from "lucide-react";

function TripList({
  trips,
  search,
  onEdit,
  onDelete
}) {

  return (

    <div>

      <div className="
        grid grid-cols-1
        xl:grid-cols-2
        gap-8
      ">

        {trips
          .filter((t) =>
            t.destination
              .toLowerCase()
              .includes(
                search.toLowerCase()
              )
          )
          .map((t) => (

            <div
              key={t._id}
              className="
          bg-white
                border border-white/10
                rounded-2xl
                overflow-hidden
                hover:border-cyan-400/20
                transition-all duration-300
              "
            >

              {/* TOP IMAGE */}

              <div className="
                relative h-72
                overflow-hidden
              ">

                {t.plan?.dayPlan?.[0]
                  ?.image ? (

                  <img
                    src={
                      t.plan.dayPlan[0]
                        .image
                    }
                    alt={t.destination}
                    className="
                      w-full h-full
                      object-cover
                    "
                  />

                ) : (

                  <div className="
                    w-full h-full
                 bg-[#f8fafc]
                  " />

                )}

                {/* OVERLAY */}

                <div className="
                  absolute inset-0
                  bg-gradient-to-t
                  from-black/80
                  via-black/10
                  to-transparent
                "></div>

                {/* CONTENT */}

                <div className="
                  absolute bottom-0
                  left-0 w-full
                  p-6
                ">

                  <div className="
                    flex items-start
                    justify-between
                  ">

                    <div>

                      <h2 className="
                        text-4xl font-bold
                        capitalize
                      ">

                        {t.destination}

                      </h2>

                      <div className="
                        flex items-center
                        gap-2 mt-3
                        text-gray-200
                      ">

                        <Calendar size={16} />

                        {t.date}

                      </div>

                    </div>

                    <div className="
                      px-4 py-2 rounded-xl
                      bg-black/30
                      backdrop-blur-md
                      border border-white/10
                    ">

                      <p className="
                        text-green-300
                        font-bold text-lg
                      ">

                        ₹{t.budget}

                      </p>

                    </div>

                  </div>

                </div>

              </div>

              {/* BODY */}

              <div className="p-6">

                {/* WEATHER */}

                {t.weather && (

                  <div className="
                    flex items-center
                    justify-between
                    p-4 rounded-2xl
                  bg-[#f8fafc]
                    border border-white/10
                    mb-5
                  ">

                    <div className="
                      flex items-center gap-3
                    ">

                      <CloudSun
                        className="
                          text-cyan-400
                        "
                      />

                      <div>

                        <p className="
                          text-sm text-gray-400
                        ">

                          Weather

                        </p>

                        <h3 className="
                          font-bold
                        ">

                          {
                            t.weather.condition
                          }

                        </h3>

                      </div>

                    </div>

                    <h2 className="
                      text-2xl font-bold
                    ">

                      {
                        t.weather.temperature
                      }°C

                    </h2>

                  </div>

                )}

                {/* HOTELS */}

                <div className="
                  grid md:grid-cols-2
                  gap-4 mb-5
                ">

                  <div className="
                    p-4 rounded-2xl
                  bg-[#f8fafc]
                    border border-white/10
                  ">

                    <div className="
                      flex items-center gap-2
                      text-cyan-400 mb-3
                    ">

                      <Hotel size={18} />

                      Budget Hotel

                    </div>

                    <h3 className="
                      font-semibold
                    ">

                      {
                        t.plan?.hotel
                          ?.budget
                      }

                    </h3>

                  </div>

                  <div className="
                    p-4 rounded-2xl
               bg-[#f8fafc]
                    border border-white/10
                  ">

                    <div className="
                      flex items-center gap-2
                      text-yellow-400 mb-3
                    ">

                      <Star size={18} />

                      Luxury Hotel

                    </div>

                    <h3 className="
                      font-semibold
                    ">

                      {
                        t.plan?.hotel
                          ?.luxury
                      }

                    </h3>

                  </div>

                </div>

                {/* DAY PLAN */}

                <div className="
                  space-y-4
                ">

                  {t.plan?.dayPlan
                    ?.slice(0, 2)
                    .map((d, i) => (

                    <div
                      key={i}
                      className="
                        flex gap-4
                        p-4 rounded-2xl
                   bg-[#f8fafc]
                        border border-white/10
                      "
                    >

                      {/* IMAGE */}

                      {d.image ? (

                        <img
                          src={d.image}
                          alt={d.place}
                          className="
                            w-28 h-28
                            object-cover
                            rounded-xl
                          "
                        />

                      ) : (

                        <div className="
                          w-28 h-28
                          bg-black/20
                          rounded-xl
                        " />

                      )}

                      {/* INFO */}

                      <div className="
                        flex-1
                      ">

                        <p className="
                          text-cyan-400
                          text-sm
                        ">

                          Day {d.day}

                        </p>

                        <h2 className="
                          text-xl font-bold mt-1
                        ">

                          {d.place}

                        </h2>

                        <div className="
                          flex gap-4 mt-3
                          text-gray-400 text-sm
                        ">

                          <p className="
                            flex items-center gap-1
                          ">

                            <Star size={14} />

                            {d.rating}

                          </p>

                          <p className="
                            flex items-center gap-1
                          ">

                            <MapPin size={14} />

                            {d.distance}

                          </p>

                        </div>

                        {d.description && (

                          <p className="
                            text-gray-400
                            mt-3 text-sm
                          ">

                            {d.description}

                          </p>

                        )}

                      </div>

                    </div>

                  ))}

                </div>

                {/* COST */}

                <div className="
                  grid grid-cols-3
                  gap-4 mt-6
                ">

                  <div className="
                    p-4 rounded-2xl
               bg-[#f8fafc]
                    border border-white/10
                  ">

                    <p className="
                      text-gray-400 text-sm
                    ">

                      Hotel

                    </p>

                    <h3 className="
                      text-xl font-bold mt-2
                    ">

                      ₹{
                        t.plan?.breakdown
                          ?.hotel
                      }

                    </h3>

                  </div>

                  <div className="
                    p-4 rounded-2xl
            bg-[#f8fafc]
                    border border-white/10
                  ">

                    <p className="
                      text-gray-400 text-sm
                    ">

                      Food

                    </p>

                    <h3 className="
                      text-xl font-bold mt-2
                    ">

                      ₹{
                        t.plan?.breakdown
                          ?.food
                      }

                    </h3>

                  </div>

                  <div className="
                    p-4 rounded-2xl
                   bg-[#f8fafc]
                    border border-white/10
                  ">

                    <p className="
                      text-gray-400 text-sm
                    ">

                      Travel

                    </p>

                    <h3 className="
                      text-xl font-bold mt-2
                    ">

                      ₹{
                        t.plan?.breakdown
                          ?.travel
                      }

                    </h3>

                  </div>

                </div>

                {/* BUTTONS */}

                <div className="
                  flex gap-4 mt-6
                ">

                  <button
                    onClick={() =>
                      onEdit(t)
                    }
                    className="
                      flex-1 py-4
                      rounded-2xl
                      bg-cyan-500/10
                      border border-cyan-400/20
                      hover:bg-cyan-500/20
                      transition-all
                      flex items-center
                      justify-center gap-2
                    "
                  >

                    <Pencil size={18} />

                    Edit

                  </button>

                  <button
                    onClick={() =>
                      onDelete(t._id)
                    }
                    className="
                      flex-1 py-4
                      rounded-2xl
                      bg-red-500/10
                      border border-red-400/20
                      hover:bg-red-500/20
                      transition-all
                      flex items-center
                      justify-center gap-2
                    "
                  >

                    <Trash2 size={18} />

                    Delete

                  </button>

                </div>

              </div>

            </div>

          ))}

      </div>

    </div>
  );
}

export default TripList;