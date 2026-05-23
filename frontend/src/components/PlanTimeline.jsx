import {
  MapPin,
  Star,
  ArrowRight
} from "lucide-react";

function PlanTimeline({ dayPlan }) {

  if (!dayPlan) return null;

  return (

    <section className="
      relative
      bg-white
      rounded-[36px]
      border border-slate-200
      shadow-[0_25px_80px_rgba(15,23,42,0.08)]
      p-8
      overflow-hidden
    ">

      {/* LIGHT BACKGROUND GLOW */}
      <div className="
        absolute top-0 right-0
        w-72 h-72
        bg-cyan-100/60
        rounded-full
        blur-[110px]
        pointer-events-none
      " />

      <div className="
        absolute bottom-0 left-0
        w-72 h-72
        bg-blue-100/50
        rounded-full
        blur-[120px]
        pointer-events-none
      " />

      <div className="relative z-10">

        {/* HEADER */}

        <div className="
          mb-12
          bg-white
          border border-slate-200
          rounded-[30px]
          p-7
          shadow-[0_18px_45px_rgba(15,23,42,0.07)]
        ">

          <p className="
            text-cyan-500
            uppercase tracking-[5px]
            text-sm font-semibold
          ">

            AI Itinerary

          </p>

          <h2 className="
            text-5xl font-bold
            mt-4
            text-slate-950
          ">

            Travel Timeline 🗓

          </h2>

          <p className="
            text-slate-500
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
                gap-6
                bg-white
                border border-slate-200
                rounded-[32px]
                p-4
                overflow-hidden
                shadow-[0_18px_45px_rgba(15,23,42,0.10)]
                hover:shadow-[0_28px_70px_rgba(15,23,42,0.16)]
                hover:-translate-y-1
                transition-all duration-500
              "
            >

              {/* IMAGE */}

              <div className="
                relative
                overflow-hidden
                h-[280px]
                bg-slate-100
                rounded-[28px]
                shadow-[0_12px_30px_rgba(15,23,42,0.12)]
              ">

                <img
                  src={day.image}
                  alt={day.place}
                  className="
                    w-full h-full
                    object-cover
                    rounded-[28px]
                    group-hover:scale-105
                    transition-transform duration-700
                  "
                />

                {/* OVERLAY */}

                <div className="
                  absolute inset-0
                  rounded-[28px]
                  bg-gradient-to-t
                  from-black/70
                  via-black/20
                  to-transparent
                " />

                {/* DAY */}

                <div className="
                  absolute top-5 left-5
                  px-5 py-3
                  rounded-full
                  bg-white/90
                  backdrop-blur-xl
                  border border-white/60
                  shadow-[0_10px_25px_rgba(0,0,0,0.18)]
                  font-semibold
                  text-slate-900
                ">

                  Day {day.day}

                </div>

              </div>

              {/* CONTENT */}

              <div className="
                p-6
                flex flex-col
                justify-between
                bg-gradient-to-br
                from-white
                to-slate-50
                rounded-[28px]
                border border-slate-100
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

                      <div className="
                        w-11 h-11
                        rounded-2xl
                        bg-cyan-50
                        border border-cyan-100
                        flex items-center justify-center
                        shadow-sm
                      ">
                        <MapPin
                          size={22}
                          className="text-cyan-500"
                        />
                      </div>

                      <h2 className="
                        text-3xl font-bold
                        text-slate-950
                      ">

                        {day.place}

                      </h2>

                    </div>

                    <div className="
                      flex items-center gap-2
                      px-4 py-2
                      rounded-full
                      bg-yellow-50
                      text-yellow-600
                      border border-yellow-100
                      shadow-sm
                      font-semibold
                    ">

                      <Star
                        size={16}
                        className="fill-yellow-400 text-yellow-400"
                      />

                      {day.rating}

                    </div>

                  </div>

                  {/* DESCRIPTION */}

                  <p className="
                    text-slate-500
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
                    bg-white
                    border border-slate-200
                    text-slate-600
                    shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_8px_20px_rgba(15,23,42,0.06)]
                  ">

                    📍 Distance:
                    {" "}
                    <span className="font-semibold text-slate-900">
                      {day.distance}
                    </span>

                  </div>

                  <button className="
                    flex items-center gap-2
                    px-6 py-3
                    rounded-2xl
                    bg-gradient-to-r
                    from-cyan-500
                    to-blue-500
                    text-white
                    font-semibold
                    shadow-[0_14px_30px_rgba(59,130,246,0.30)]
                    hover:scale-105
                    hover:shadow-[0_18px_40px_rgba(59,130,246,0.40)]
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

      </div>

    </section>
  );
}

export default PlanTimeline;