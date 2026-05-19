import { useEffect, useState } from "react";
import { MapPin, Search, Sparkles } from "lucide-react";

function HeroSection({ search, setSearch }) {
  const [currentImage, setCurrentImage] = useState(0);

  const destinations = ["Goa", "Bali", "Maldives", "Manali", "Dubai"];

  const heroImages = [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=2000&auto=format&fit=crop",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <section
      className="
        relative
        min-h-screen
        overflow-hidden
        flex
        items-center
        pt-28
        bg-slate-950
      "
    >
      {/* BACKGROUND IMAGE SLIDER */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt="Travel background"
            className={`
              absolute
              inset-0
              w-full
              h-full
              object-cover
              scale-105
              transition-opacity
              duration-1000
              ease-in-out
              ${index === currentImage ? "opacity-100" : "opacity-0"}
            `}
          />
        ))}
      </div>

      {/* DARK OVERLAY */}
      <div
        className="
          absolute
          inset-0
          z-10
          bg-gradient-to-r
          from-black/80
          via-black/55
          to-black/25
        "
      />

      {/* EXTRA SOFT SHADE */}
      <div
        className="
          absolute
          inset-0
          z-10
          bg-gradient-to-t
          from-black/45
          via-transparent
          to-black/20
        "
      />

      {/* SOFT GLOW */}
      <div
        className="
          absolute
          top-[-120px]
          right-[-120px]
          z-10
          w-[420px]
          h-[420px]
          rounded-full
          bg-sky-500/20
          blur-[130px]
        "
      />

      {/* CONTENT */}
      <div
        className="
          relative
          z-20
          w-full
          px-6
          md:px-10
          lg:px-20
        "
      >
        <div className="max-w-4xl">
          {/* BADGE */}
          <div
            className="
              inline-flex
              items-center
              gap-3
              px-6
              py-3
              rounded-full
              bg-white/10
              border
              border-white/20
              backdrop-blur-xl
              mb-8
              shadow-lg
              shadow-black/20
            "
          >
            <Sparkles size={18} className="text-sky-400" />

            <span
              className="
                text-sky-100
                font-semibold
                tracking-wide
                text-sm
                md:text-base
              "
            >
              AI POWERED TRAVEL PLANNER
            </span>
          </div>

          {/* HEADING */}
          <h1
            className="
              text-5xl
              md:text-7xl
              lg:text-8xl
              font-black
              leading-[0.95]
              text-white
              drop-shadow-2xl
            "
          >
            Explore The World

            <span
              className="
                block
                text-transparent
                bg-clip-text
                bg-gradient-to-r
                from-sky-300
                via-cyan-300
                to-blue-500
              "
            >
              With AI
            </span>
          </h1>

          {/* DESCRIPTION */}
          <p
            className="
              mt-8
              text-lg
              md:text-xl
              text-gray-200
              leading-relaxed
              max-w-2xl
              drop-shadow-md
            "
          >
            Discover luxury stays, hidden gems, curated itineraries and
            unforgettable experiences powered by AI.
          </p>

          {/* SEARCH BAR */}
          <div
            className="
              mt-14
              max-w-4xl
              rounded-[35px]
              bg-white/15
              border
              border-white/20
              backdrop-blur-2xl
              p-4
              flex
              flex-col
              md:flex-row
              gap-4
              shadow-2xl
              shadow-black/30
            "
          >
            {/* INPUT BOX */}
            <div
              className="
                flex-1
                flex
                items-center
                gap-4
                px-5
                rounded-2xl
                bg-white
                border
                border-white/30
                shadow-sm
                focus-within:ring-0
                focus-within:outline-none
                focus-within:border-white/30
              "
            >
              <MapPin size={22} className="text-sky-500" />

              <input
                type="text"
                placeholder="Search destination..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
                  w-full
                  py-5
                  bg-transparent
                  text-lg
                  text-slate-900
                  placeholder:text-slate-400
                  outline-none
                  border-none
                  ring-0
                  focus:outline-none
                  focus:ring-0
                  focus:border-none
                  focus-visible:outline-none
                  focus-visible:ring-0
                "
              />
            </div>

            {/* BUTTON */}
            <button
              onClick={() => {
                window.scrollTo({
                  top: 700,
                  behavior: "smooth",
                });
              }}
              className="
                px-10
                py-5
                rounded-2xl
                bg-gradient-to-r
                from-sky-500
                to-blue-600
                text-white
                font-bold
                text-lg
                flex
                items-center
                justify-center
                gap-3
                shadow-lg
                shadow-sky-500/30
                hover:scale-105
                transition-all
                duration-300
                outline-none
                focus:outline-none
                focus:ring-0
                active:scale-95
              "
            >
              <Search size={22} />
              Explore Trip
            </button>
          </div>

          {/* DESTINATION CHIPS */}
          <div
            className="
              flex
              flex-wrap
              gap-4
              mt-10
            "
          >
            {destinations.map((place, index) => (
              <button
                key={index}
                onClick={() => setSearch(place)}
                className="
                  px-6
                  py-3
                  rounded-full
                  bg-white/15
                  border
                  border-white/20
                  text-white
                  font-medium
                  backdrop-blur-md
                  hover:bg-sky-500
                  hover:border-sky-500
                  hover:scale-105
                  transition-all
                  duration-300
                  outline-none
                  focus:outline-none
                  focus:ring-0
                  focus-visible:outline-none
                  focus-visible:ring-0
                  active:scale-95
                "
              >
                {place}
              </button>
            ))}
          </div>

          {/* STATS */}
          <div
            className="
              grid
              grid-cols-2
              md:grid-cols-4
              gap-8
              mt-20
              pb-10
            "
          >
            <div>
              <h2 className="text-5xl font-black text-sky-400">10K+</h2>
              <p className="text-gray-300 mt-3">Trips Planned</p>
            </div>

            <div>
              <h2 className="text-5xl font-black text-sky-400">120+</h2>
              <p className="text-gray-300 mt-3">Destinations</p>
            </div>

            <div>
              <h2 className="text-5xl font-black text-sky-400">5★</h2>
              <p className="text-gray-300 mt-3">Luxury Hotels</p>
            </div>

            <div>
              <h2 className="text-5xl font-black text-sky-400">AI</h2>
              <p className="text-gray-300 mt-3">Smart Planning</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;