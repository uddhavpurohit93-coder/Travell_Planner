import {
  MapPin,
  Search,
  Sparkles
} from "lucide-react";

function HeroSection({
  search,
  setSearch
}) {

  const destinations = [
    "Goa",
    "Bali",
    "Maldives",
    "Manali",
    "Dubai"
  ];

  return (

    <section className="
      relative overflow-hidden
      min-h-screen
      flex items-center
      border-b border-white/10
      bg-[#020817]
      pt-28
    ">

      {/* BACKGROUND GRID */}

      <div className="
        absolute inset-0
        grid grid-cols-2 md:grid-cols-4
      ">

        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop"
          alt=""
          className="
            w-full h-full
            object-cover
            opacity-40
          "
        />

        <img
          src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=2000&auto=format&fit=crop"
          alt=""
          className="
            w-full h-full
            object-cover
            opacity-40
          "
        />

        <img
          src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2000&auto=format&fit=crop"
          alt=""
          className="
            w-full h-full
            object-cover
            opacity-40
          "
        />

        <img
          src="https://images.unsplash.com/photo-1493558103817-58b2924bce98?q=80&w=2000&auto=format&fit=crop"
          alt=""
          className="
            w-full h-full
            object-cover
            opacity-40
          "
        />

      </div>

      {/* OVERLAY */}

      <div className="
        absolute inset-0
        bg-gradient-to-r
        from-[#020817]
        via-[#020817]/85
        to-[#020817]/40
        z-10
      " />

      {/* GLOW */}

      <div className="
        absolute
        top-[-150px]
        right-[-150px]
        w-[500px]
        h-[500px]
        bg-cyan-500/20
        blur-[140px]
        rounded-full
        z-0
      " />

      {/* CONTENT */}

      <div className="
        relative z-20
        max-w-7xl mx-auto
        px-6 w-full
      ">

        <div className="
          max-w-4xl
        ">

          {/* BADGE */}

          <div className="
            inline-flex
            items-center gap-3
            px-6 py-3
            rounded-full
            bg-cyan-500/10
            border border-cyan-400/20
            backdrop-blur-xl
            mb-8
          ">

            <Sparkles
              size={18}
              className="
                text-cyan-400
              "
            />

            <span className="
              text-cyan-300
              font-medium
              tracking-wide
            ">

              AI POWERED TRAVEL PLANNER

            </span>

          </div>

          {/* HEADING */}

          <h1 className="
            text-6xl
            lg:text-8xl
            font-black
            leading-[0.95]
          ">

            Explore The World

            <span className="
              block
              text-transparent
              bg-clip-text
              bg-gradient-to-r
              from-cyan-400
              to-blue-500
            ">

              With AI

            </span>

          </h1>

          {/* DESCRIPTION */}

          <p className="
            mt-10
            text-xl
            text-gray-300
            leading-relaxed
            max-w-2xl
          ">

            Luxury itineraries,
            premium hotels,
            hidden gems and
            real travel insights
            powered by AI.

          </p>

          {/* SEARCH BAR */}

          <div className="
            mt-14
            bg-white/10
            border border-white/10
            backdrop-blur-2xl
            rounded-[35px]
            p-4
            flex flex-col md:flex-row
            gap-4
            max-w-4xl
            shadow-2xl
            shadow-cyan-500/10
          ">

            {/* INPUT */}

            <div className="
              flex-1
              flex items-center
              gap-4
              px-5
              bg-[#091524]
              rounded-2xl
              border border-white/10
            ">

              <MapPin
                size={22}
                className="
                  text-cyan-400
                "
              />

              <input
                type="text"
                placeholder="
                  Search destination...
                "
                className="
                  w-full
                  bg-transparent
                  py-5
                  outline-none
                  text-lg
                  placeholder:text-gray-500
                "
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
              />

            </div>

            {/* BUTTON */}

            <button
              onClick={() => {

                window.scrollTo({
                  top: 700,
                  behavior: "smooth"
                });

              }}
              className="
                px-10 py-5
                rounded-2xl
                bg-gradient-to-r
                from-cyan-500
                to-blue-500
                font-bold
                text-lg
                hover:scale-105
                transition-all duration-300
                flex items-center
                justify-center gap-3
                shadow-lg
                shadow-cyan-500/30
              "
            >

              <Search size={22} />

              Explore Trip

            </button>

          </div>

          {/* DESTINATIONS */}

          <div className="
            flex flex-wrap
            gap-4
            mt-10
          ">

            {destinations.map(
              (place, index) => (

                <button
                  key={index}
                  onClick={() =>
                    setSearch(place)
                  }
                  className="
                    px-6 py-3
                    rounded-full
                    bg-white/10
                    border border-white/10
                    backdrop-blur-xl
                    hover:bg-cyan-500
                    hover:border-cyan-500
                    hover:scale-105
                    transition-all
                  "
                >

                  {place}

                </button>

              )
            )}

          </div>

          {/* STATS */}

          <div className="
            grid
            grid-cols-2 md:grid-cols-4
            gap-8
            mt-20
          ">

            <div>

              <h2 className="
                text-5xl
                font-black
                text-cyan-400
              ">

                10K+

              </h2>

              <p className="
                text-gray-400
                mt-3
              ">

                Trips Planned

              </p>

            </div>

            <div>

              <h2 className="
                text-5xl
                font-black
                text-cyan-400
              ">

                120+

              </h2>

              <p className="
                text-gray-400
                mt-3
              ">

                Destinations

              </p>

            </div>

            <div>

              <h2 className="
                text-5xl
                font-black
                text-cyan-400
              ">

                5★

              </h2>

              <p className="
                text-gray-400
                mt-3
              ">

                Luxury Hotels

              </p>

            </div>

            <div>

              <h2 className="
                text-5xl
                font-black
                text-cyan-400
              ">

                AI

              </h2>

              <p className="
                text-gray-400
                mt-3
              ">

                Smart Planning

              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default HeroSection;