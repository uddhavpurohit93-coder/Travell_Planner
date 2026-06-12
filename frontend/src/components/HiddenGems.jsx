import { useState } from "react";
import { Gem, MapPin, X, ExternalLink, Map } from "lucide-react";

function HiddenGems({ gems, destination }) {
  const [modal, setModal] = useState(null);

  if (!gems || gems.length === 0) return null;

  const handleExplore = (gem) => setModal(gem);

  const openGoogleMaps = (gemName) => {
    const query = encodeURIComponent(`${gemName} ${destination || ""}`);
    window.open(`https://www.google.com/maps/search/${query}`, "_blank");
  };

  const openGoogleSearch = (gemName) => {
    const query = encodeURIComponent(
      `${gemName} ${destination || ""} travel guide`
    );
    window.open(`https://www.google.com/search?q=${query}`, "_blank");
  };

  return (
    <section className="
      relative overflow-hidden
      bg-white dark:bg-slate-950
      rounded-[36px]
      border border-slate-200 dark:border-slate-800
      shadow-[0_25px_80px_rgba(15,23,42,0.08)]
      dark:shadow-black/40
      p-8
      transition-colors duration-300
    ">

      {/* glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-100/60 dark:bg-cyan-500/10 rounded-full blur-[110px]" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-100/50 dark:bg-blue-500/10 rounded-full blur-[120px]" />

      <div className="relative z-10">

        {/* HEADER */}
        <div className="
          mb-12
          bg-white dark:bg-slate-900
          border border-slate-200 dark:border-slate-800
          rounded-[30px]
          p-7
          shadow-[0_18px_45px_rgba(15,23,42,0.07)]
          dark:shadow-black/30
        ">
          <p className="text-cyan-500 uppercase tracking-[5px] text-sm font-semibold">
            Explore More
          </p>

          <h2 className="text-5xl font-bold mt-4 text-slate-900 dark:text-white">
            Hidden Gems 📍
          </h2>

          <p className="text-slate-500 dark:text-slate-400 mt-5 text-lg max-w-2xl">
            Secret destinations and unique experiences curated specially by AI.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {gems.map((gem, index) => {
            const name = typeof gem === "string" ? gem : gem.name;
            const image =
              gem.image ||
              "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500";

            return (
              <div
                key={index}
                className="
                  group overflow-hidden
                  rounded-[32px]
                  border border-slate-200 dark:border-slate-800
                  bg-white dark:bg-slate-900
                  shadow-[0_16px_40px_rgba(15,23,42,0.08)]
                  dark:shadow-black/30
                  hover:shadow-[0_28px_70px_rgba(15,23,42,0.16)]
                  hover:-translate-y-2
                  transition-all duration-500
                "
              >
                {/* IMAGE */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                    onError={(e) =>
                      (e.currentTarget.src =
                        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500")
                    }
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* ICON */}
                  <div className="absolute top-5 left-5">
                    <div className="w-14 h-14 rounded-2xl bg-white/90 dark:bg-slate-800/80 backdrop-blur-md flex items-center justify-center">
                      <Gem size={26} className="text-cyan-500" />
                    </div>
                  </div>

                  {/* TEXT */}
                  <div className="absolute bottom-5 left-5 right-5">
                    <h2 className="text-3xl font-bold text-white">
                      {name}
                    </h2>

                    <div className="flex items-center gap-2 mt-3 text-white/90">
                      <MapPin size={18} />
                      {destination
                        ? `${destination} — Hidden Gem`
                        : "Hidden travel destination"}
                    </div>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-6">
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                    Discover this beautiful hidden place and lesser-known attraction loved by travellers.
                  </p>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => handleExplore({ name, image })}
                      className="
                        flex-1 px-4 py-3 rounded-2xl
                        bg-gradient-to-r from-cyan-500 to-blue-500
                        text-white font-semibold
                        hover:scale-105 transition-all text-sm
                      "
                    >
                      Explore Place
                    </button>

                    <button
                      onClick={() => openGoogleMaps(name)}
                      className="
                        px-4 py-3 rounded-2xl
                        bg-slate-100 dark:bg-slate-800
                        text-slate-700 dark:text-slate-300
                        hover:bg-slate-200 dark:hover:bg-slate-700
                        transition-all
                      "
                      title="View on Google Maps"
                    >
                      <Map size={18} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MODAL */}
      {modal && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={() => setModal(null)}
        >
          <div
            className="
              bg-white dark:bg-slate-900
              rounded-3xl p-6 max-w-md w-full
              shadow-2xl dark:shadow-black/40
              relative
            "
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModal(null)}
              className="
                absolute top-4 right-4
                bg-red-500 text-white
                w-9 h-9 rounded-full
                flex items-center justify-center
                hover:bg-red-600 transition-all
              "
            >
              <X size={18} />
            </button>

            <img
              src={modal.image}
              alt={modal.name}
              className="w-full h-48 object-cover rounded-2xl mb-5"
            />

            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-slate-800 flex items-center justify-center">
                <Gem size={20} className="text-cyan-500" />
              </div>

              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                {modal.name}
              </h2>
            </div>

            {destination && (
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm mt-1 mb-4">
                <MapPin size={14} />
                {destination}
              </div>
            )}

            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              {modal.name} is a hidden gem in {destination || "this destination"} —
              a beautiful spot away from tourist crowds.
            </p>

            <div className="flex gap-3 mt-5">
              <button
                onClick={() => openGoogleSearch(modal.name)}
                className="
                  flex-1 py-3 rounded-2xl
                  bg-gradient-to-r from-cyan-500 to-blue-500
                  text-white font-bold
                  flex items-center justify-center gap-2
                "
              >
                Info <ExternalLink size={16} />
              </button>

              <button
                onClick={() => openGoogleMaps(modal.name)}
                className="
                  flex-1 py-3 rounded-2xl
                  bg-slate-900 dark:bg-slate-800
                  text-white font-bold
                  flex items-center justify-center gap-2
                "
              >
                Maps <Map size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default HiddenGems;