import {
  MapPin,
  Star,
  ArrowRight
} from "lucide-react";

function PlanTimeline({ dayPlan }) {

  if (!dayPlan) return null;

  return (

    <section>

      {/* HEADER */}

      <div className="
        mb-12
      ">

        <p className="
          text-cyan-400
          uppercase tracking-[5px]
          text-sm font-semibold
        ">

          AI Itinerary

        </p>

        <h2 className="
          text-5xl font-bold
          mt-4
        ">

          Travel Timeline 🗓

        </h2>

        <p className="
          text-gray-400
          mt-5 text-lg
          max-w-2xl
        ">

          Day-by-day personalized
          experiences curated
          specially for your trip.

        </p>

      </div>

      {/* TIMELINE */}

      <div className="
        space-y-8
      ">

        {dayPlan.map((day, index) => (

          <div
            key={index}
            className="
              group
              grid lg:grid-cols-2
              gap-0
              bg-[#101826]
              border border-white/10
              rounded-[32px]
              overflow-hidden
              hover:-translate-y-1
              transition-all duration-500
            "
          >

            {/* IMAGE */}

            <div className="
              relative
              overflow-hidden
              h-[280px]
            ">

              <img
                src={day.image}
                alt={day.place}
                className="
                  w-full h-full
                  object-cover
                  group-hover:scale-110
                  transition-transform duration-700
                "
              />

              {/* OVERLAY */}

              <div className="
                absolute inset-0
                bg-gradient-to-t
                from-black/80
                to-transparent
              " />

              {/* DAY */}

              <div className="
                absolute top-5 left-5
                px-5 py-3
                rounded-full
                bg-black/50
                backdrop-blur-xl
                border border-white/10
                font-semibold
              ">

                Day {day.day}

              </div>

            </div>

            {/* CONTENT */}

            <div className="
              p-8
              flex flex-col
              justify-between
            ">

              <div>

                {/* TOP */}

                <div className="
                  flex items-center
                  justify-between
                ">

                  <div className="
                    flex items-center gap-3
                  ">

                    <MapPin
                      size={22}
                      className="text-cyan-400"
                    />

                    <h2 className="
                      text-3xl font-bold
                    ">

                      {day.place}

                    </h2>

                  </div>

                  <div className="
                    flex items-center gap-2
                    px-4 py-2
                    rounded-full
                    bg-yellow-500/10
                    text-yellow-400
                    border border-yellow-500/20
                  ">

                    <Star
                      size={16}
                      className="fill-yellow-400"
                    />

                    {day.rating}

                  </div>

                </div>

                {/* DESCRIPTION */}

                <p className="
                  text-gray-400
                  mt-6
                  leading-relaxed
                  text-lg
                ">

                  {day.description}

                </p>

              </div>

              {/* BOTTOM */}

              <div className="
                flex items-center
                justify-between
                mt-8
              ">

                <div className="
                  px-5 py-3
                  rounded-2xl
                  bg-white/5
                  border border-white/10
                  text-gray-300
                ">

                  📍 Distance:
                  {" "}
                  {day.distance}

                </div>

                <button className="
                  flex items-center gap-2
                  px-6 py-3
                  rounded-2xl
                  bg-gradient-to-r
                  from-cyan-500
                  to-blue-500
                  font-semibold
                  hover:scale-105
                  transition-all
                ">

                  Explore

                  <ArrowRight size={18} />

                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}

export default PlanTimeline;