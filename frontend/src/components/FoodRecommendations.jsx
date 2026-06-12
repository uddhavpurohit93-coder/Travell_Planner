import { useState } from "react";
import { Star, MapPin, X, ExternalLink } from "lucide-react";

const STATIC_FOOD = {
  udaipur: [
    {
      name: "Dal Baati Churma",
      place: "Traditional Rajasthani Meal",
      rating: "4.9",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/9/94/Dal_Baati_Churma.jpg",
      description:
        "The iconic Rajasthani thali with lentils, baked wheat balls and sweet churma."
    },
    {
      name: "Laal Maas",
      place: "Rajasthani Mutton Curry",
      rating: "4.8",
      image:
        "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500",
      description:
        "Fiery red mutton curry cooked with mathania chillies and spices."
    },
  ],
};

function FoodRecommendations({ destination, foodData }) {
  const [modal, setModal] = useState(null);

  if (!destination?.trim()) return null;

  let foods = [];

  if (foodData?.length) {
    foods = foodData.map((item) => ({
      name: typeof item === "string" ? item : item.name,
      place: destination,
      rating: "4.7",
      image:
        item.image ||
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500",
      description: `A must-try dish in ${destination}.`,
    }));
  } else {
    const key = destination.toLowerCase().trim();
    const match = Object.entries(STATIC_FOOD).find(([city]) =>
      key.includes(city)
    );
    foods = match?.[1] || [];
  }

  if (!foods.length) {
    foods = [
      {
        name: "Local Street Food",
        place: destination,
        rating: "4.7",
        image:
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500",
        description: `Explore food culture of ${destination}`,
      },
    ];
  }

  const openGoogle = (food) => {
    window.open(
      `https://www.google.com/search?q=${encodeURIComponent(
        food.name + " " + food.place + " food"
      )}`,
      "_blank"
    );
  };

  return (
    <section className="
      py-20 px-8
      bg-white dark:bg-slate-950
      transition-colors duration-300
    ">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-12">
          <p className="text-cyan-500 uppercase tracking-[5px] text-sm font-bold">
            Food & Dining
          </p>

          <h2 className="text-5xl font-black mt-4 text-slate-900 dark:text-white">
            Food Recommendations 🍽️
          </h2>

          <p className="text-slate-500 dark:text-slate-400 mt-5 text-lg max-w-2xl">
            Famous local food experiences based on your destination.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {foods.map((food, index) => (
            <div
              key={index}
              className="
                overflow-hidden rounded-[32px]
                bg-white dark:bg-slate-900
                border border-slate-200 dark:border-slate-800
                shadow-[0_18px_45px_rgba(15,23,42,0.08)]
                dark:shadow-black/30
                hover:-translate-y-2
                hover:shadow-[0_28px_70px_rgba(15,23,42,0.16)]
                transition-all duration-500
              "
            >
              {/* IMAGE */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-full h-full object-cover hover:scale-110 transition-all duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* RATING */}
                <div className="absolute top-5 right-5 bg-white dark:bg-slate-800 rounded-full px-4 py-2 flex items-center gap-1 font-bold shadow-lg">
                  <Star size={16} className="text-yellow-500 fill-yellow-400" />
                  {food.rating}
                </div>

                {/* TEXT */}
                <div className="absolute bottom-5 left-5 right-5">
                  <h3 className="text-3xl font-black text-white">
                    {food.name}
                  </h3>

                  <div className="flex items-center gap-2 mt-2 text-white/90">
                    <MapPin size={16} />
                    {food.place}
                  </div>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-6">
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                  {food.description}
                </p>

                <button
                  onClick={() => setModal(food)}
                  className="
                    mt-6 px-6 py-3 rounded-2xl
                    bg-slate-900 dark:bg-slate-800
                    text-white font-bold
                    hover:bg-cyan-500
                    transition-all
                  "
                >
                  Food Suggestions →
                </button>
              </div>
            </div>
          ))}
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

            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              {modal.name}
            </h2>

            <div className="flex items-center gap-2 mt-2 text-slate-500 dark:text-slate-400 text-sm">
              <MapPin size={14} /> {modal.place}
            </div>

            <div className="flex items-center gap-1 mt-2">
              <Star size={14} className="text-yellow-500 fill-yellow-400" />
              <span className="font-bold text-slate-700 dark:text-slate-300">
                {modal.rating}
              </span>
            </div>

            <p className="text-slate-500 dark:text-slate-400 mt-4 leading-relaxed">
              {modal.description}
            </p>

            <button
              onClick={() => openGoogle(modal)}
              className="
                mt-5 w-full py-3 rounded-2xl
                bg-gradient-to-r from-cyan-500 to-blue-500
                text-white font-bold
                flex items-center justify-center gap-2
              "
            >
              Search on Google <ExternalLink size={16} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default FoodRecommendations;