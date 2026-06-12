import {
  MapPin,
  Star,
  ArrowRight,
} from "lucide-react";

function HotelSection({ hotels }) {
  const fallbackImage =
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200";

  return (
    <section className="mt-20">
      {/* HEADING */}
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-cyan-500 font-semibold tracking-wide uppercase text-sm">
            Luxury Stays
          </p>

          <h2 className="text-5xl font-bold mt-2 text-slate-900 dark:text-white">
            Recommended Hotels 🏨
          </h2>

          <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-2xl text-lg">
            Discover premium hotels and luxury stays curated for your destination.
          </p>
        </div>

        <button
          className="
            hidden md:flex items-center gap-2
            px-6 py-3 rounded-2xl
            bg-white dark:bg-slate-900
            border border-slate-200 dark:border-slate-700
            text-slate-700 dark:text-slate-200
            hover:bg-cyan-500 hover:text-white
            transition-all shadow-sm
          "
        >
          View All
          <ArrowRight size={18} />
        </button>
      </div>

      {/* EMPTY */}
      {!hotels || hotels.length === 0 ? (
        <div
          className="
            p-10 rounded-3xl
            bg-white dark:bg-slate-900
            border border-slate-200 dark:border-slate-700
            text-center text-slate-500 dark:text-slate-400
          "
        >
          No hotel recommendations found.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {hotels.map((hotel, index) => {
            const image =
              hotel?.image && hotel.image.trim() !== ""
                ? hotel.image
                : fallbackImage;

            return (
              <div
                key={index}
                className="
                  group relative overflow-hidden
                  rounded-[32px]
                  bg-white dark:bg-slate-900
                  border border-slate-200 dark:border-slate-700
                  hover:-translate-y-3
                  transition-all duration-500
                  shadow-lg hover:shadow-2xl
                  dark:shadow-black/30
                "
              >
                {/* IMAGE */}
                <div className="relative overflow-hidden h-[320px]">
                  <img
                    src={image}
                    alt={hotel?.name || "Hotel"}
                    className="
                      w-full h-full object-cover
                      group-hover:scale-110
                      transition-transform duration-700
                    "
                    onError={(e) => {
                      e.currentTarget.src = fallbackImage;
                    }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                  {/* RATING */}
                  <div
                    className="
                      absolute top-5 right-5
                      px-4 py-2 rounded-full
                      bg-white/90 backdrop-blur-md
                      border border-white/60
                      flex items-center gap-2
                      text-sm font-semibold text-slate-900
                    "
                  >
                    <Star
                      size={16}
                      className="text-yellow-400 fill-yellow-400"
                    />
                    {hotel?.rating || "4.5"}
                  </div>

                  {/* HOTEL NAME */}
                  <div className="absolute bottom-0 p-6 w-full">
                    <h2 className="text-3xl font-bold text-white">
                      {hotel?.name || "Luxury Hotel"}
                    </h2>

                    <div className="flex items-center gap-2 text-slate-200 mt-3">
                      <MapPin size={18} />
                      <p className="text-sm">
                        {hotel?.location || "Prime Location"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* FOOTER */}
                <div className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                      Starting From
                    </p>

                    <h3 className="text-3xl font-bold text-cyan-500 mt-1">
                      ₹{Number(hotel?.price || 2500).toLocaleString()}
                    </h3>
                  </div>

                  <button
                    className="
                      px-5 py-3 rounded-2xl
                      bg-gradient-to-r
                      from-cyan-500
                      to-blue-500
                      text-white
                      font-semibold
                      hover:scale-105
                      transition-all
                      shadow-lg
                      shadow-cyan-500/25
                    "
                  >
                    Book Now
                  </button>
                </div>

                {/* Premium Glow */}
                <div
                  className="
                    absolute inset-0
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-500
                    pointer-events-none
                    bg-gradient-to-r
                    from-cyan-500/5
                    to-blue-500/5
                  "
                />
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default HotelSection;