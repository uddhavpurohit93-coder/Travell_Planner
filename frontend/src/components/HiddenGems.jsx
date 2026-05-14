import {
  Gem,
  MapPin
} from "lucide-react";

function HiddenGems({ gems }) {

  if (!gems || gems.length === 0)
    return null;

  return (

    <section>

      {/* HEADER */}

      <div className="mb-12">

        <p className="
          text-cyan-400
          uppercase tracking-[5px]
          text-sm font-semibold
        ">

          Explore More

        </p>

        <h2 className="
          text-5xl font-bold
          mt-4
        ">

          Hidden Gems 📍

        </h2>

        <p className="
          text-gray-400
          mt-5 text-lg
          max-w-2xl
        ">

          Secret destinations and
          unique experiences curated
          specially by AI.

        </p>

      </div>

      {/* GEMS */}

      <div className="
        grid md:grid-cols-2
        xl:grid-cols-3
        gap-8
      ">

        {gems.map((gem, index) => (

          <div
            key={index}
            className="
              relative overflow-hidden
              rounded-[32px]
              border border-cyan-400/10
              bg-gradient-to-br
              from-cyan-500/10
              to-blue-500/10
              p-8
              hover:-translate-y-2
              transition-all duration-500
            "
          >

            <div className="
              absolute -top-10 -right-10
              w-40 h-40
              bg-cyan-500/10
              blur-3xl
              rounded-full
            " />

            <div className="relative z-10">

              <div className="
                w-16 h-16
                rounded-2xl
                bg-cyan-500/10
                border border-cyan-400/20
                flex items-center justify-center
              ">

                <Gem
                  size={28}
                  className="
                    text-cyan-400
                  "
                />

              </div>

              <h2 className="
                text-3xl font-bold
                mt-8
              ">

                {gem}

              </h2>

              <div className="
                flex items-center gap-2
                mt-5 text-gray-300
              ">

                <MapPin size={18} />

                Hidden travel destination

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}

export default HiddenGems;