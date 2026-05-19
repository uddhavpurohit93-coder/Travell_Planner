import {
  Gem,
  MapPin
} from "lucide-react";

function HiddenGems({ gems }) {
  if (!gems || gems.length === 0) return null;

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
            Explore More
          </p>

          <h2 className="
            text-5xl font-bold
            mt-4
            text-slate-900
          ">
            Hidden Gems 📍
          </h2>

          <p className="
            text-slate-500
            mt-5 text-lg
            max-w-2xl
          ">
            Secret destinations and unique experiences curated specially by AI.
          </p>
        </div>

        {/* GEM CARDS */}
        <div className="
          grid md:grid-cols-2 xl:grid-cols-3
          gap-8
        ">
          {gems.map((gem, index) => (
            <div
              key={index}
              className="
                group
                relative
                overflow-hidden
                rounded-[32px]
                border border-slate-200
                bg-gradient-to-br
                from-white
                to-slate-50
                p-8
                shadow-[0_16px_40px_rgba(15,23,42,0.08)]
                hover:shadow-[0_28px_70px_rgba(15,23,42,0.16)]
                hover:-translate-y-2
                hover:border-cyan-200
                transition-all duration-500
              "
            >
              <div className="
                absolute -top-10 -right-10
                w-40 h-40
                bg-cyan-400/15
                blur-3xl
                rounded-full
                group-hover:bg-cyan-400/25
                transition-all duration-500
              " />

              <div className="
                absolute -bottom-12 -left-12
                w-44 h-44
                bg-blue-400/10
                blur-3xl
                rounded-full
                group-hover:bg-blue-400/20
                transition-all duration-500
              " />

              <div className="relative z-10">
                <div className="
                  w-16 h-16
                  rounded-2xl
                  bg-cyan-50
                  border border-cyan-100
                  flex items-center justify-center
                  shadow-[0_10px_25px_rgba(6,182,212,0.12)]
                  group-hover:scale-110
                  transition-transform duration-500
                ">
                  <Gem
                    size={28}
                    className="text-cyan-500"
                  />
                </div>

                <h2 className="
                  text-3xl font-bold
                  mt-8
                  text-slate-900
                ">
                  {gem}
                </h2>

                <div className="
                  flex items-center gap-2
                  mt-5
                  text-slate-500
                  bg-white
                  border border-slate-200
                  rounded-2xl
                  px-4 py-3
                  shadow-[0_8px_20px_rgba(15,23,42,0.05)]
                  w-fit
                ">
                  <MapPin
                    size={18}
                    className="text-cyan-500"
                  />
                  Hidden travel destination
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default HiddenGems;