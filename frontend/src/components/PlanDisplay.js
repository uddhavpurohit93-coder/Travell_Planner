import {
  MapPin,
  Star,
  Wallet,
  Utensils,
  Compass,
  Car,
  Sparkles,
} from "lucide-react";

import HotelSection from "./HotelSection";

function PlanDisplay({ plan }) {
  if (!plan) return null;

  const demoHotels = [
    {
      name: "Taj Lake Palace",
      location: "Udaipur, Rajasthan",
      rating: 4.8,
      price: "18000",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&auto=format&fit=crop",
    },
    {
      name: "The Oberoi Udaivilas",
      location: "Udaipur, Rajasthan",
      rating: 4.9,
      price: "25000",
      image:
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=900&auto=format&fit=crop",
    },
    {
      name: "Trident Udaipur",
      location: "Udaipur, Rajasthan",
      rating: 4.6,
      price: "12000",
      image:
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=900&auto=format&fit=crop",
    },
  ];

  const hotelData =
    plan.hotels?.length
      ? plan.hotels
      : plan.hotelRecommendations?.length
      ? plan.hotelRecommendations
      : demoHotels;

  return (
    <div className="space-y-20">
      {/* DAY PLANS */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div
            className="
              w-10 h-10 rounded-xl
              bg-cyan-500/10
              flex items-center justify-center
              border border-cyan-400/20
            "
          >
            <Sparkles size={18} className="text-cyan-400" />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-slate-950">
              AI Itinerary
            </h2>

            <p className="text-slate-500">
              Personalized day-wise travel plan
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {plan.dayPlan?.map((d, i) => (
            <div
              key={i}
              className="
                bg-white
                border border-slate-200
                rounded-2xl
                overflow-hidden
                hover:border-cyan-400/40
                transition-all duration-300
                shadow-sm hover:shadow-xl
              "
            >
              {/* IMAGE */}
              {d.image ? (
                <img
                  src={d.image}
                  alt={d.place}
                  className="
                    w-full h-60
                    object-cover
                  "
                />
              ) : (
                <div
                  className="
                    w-full h-60
                    bg-[#f8fafc]
                  "
                />
              )}

              {/* CONTENT */}
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-cyan-500 text-sm font-semibold">
                      Day {d.day}
                    </p>

                    <h2 className="text-2xl font-bold mt-1 text-slate-950">
                      {d.place}
                    </h2>
                  </div>

                  <div
                    className="
                      px-3 py-2 rounded-xl
                      bg-yellow-50
                      border border-yellow-100
                      text-yellow-600
                      flex items-center gap-1
                      font-semibold
                    "
                  >
                    <Star size={15} className="fill-yellow-400 text-yellow-400" />
                    {d.rating || "4.5"}
                  </div>
                </div>

                <div
                  className="
                    mt-4
                    flex items-center gap-2
                    text-slate-500
                  "
                >
                  <MapPin size={16} />
                  {d.distance || "2 km"} away
                </div>

                {d.description && (
                  <p
                    className="
                      mt-4
                      text-slate-500
                      leading-relaxed
                    "
                  >
                    {d.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* HOTELS */}
      <HotelSection hotels={hotelData} />

      {/* FOOD */}
      {plan.foodRecommendations && (
        <div
          className="
            bg-white
            border border-slate-200
            rounded-2xl
            p-6
            shadow-sm
          "
        >
          <div className="flex items-center gap-3 mb-6">
            <Utensils className="text-orange-400" />

            <h2 className="text-2xl font-bold text-slate-950">
              Food Spots
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {plan.foodRecommendations.map((food, i) => (
              <div
                key={i}
                className="
                  p-5 rounded-2xl
                  bg-[#f8fafc]
                  border border-slate-200
                "
              >
                <h3 className="text-lg font-bold text-slate-950">
                  {food.name}
                </h3>

                <p className="text-slate-500 mt-2">
                  {food.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* HIDDEN GEMS */}
      {plan.hiddenGems && (
        <div
          className="
            bg-white
            border border-slate-200
            rounded-2xl
            p-6
            shadow-sm
          "
        >
          <div className="flex items-center gap-3 mb-6">
            <Compass className="text-pink-400" />

            <h2 className="text-2xl font-bold text-slate-950">
              Hidden Gems
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {plan.hiddenGems.map((gem, i) => (
              <div
                key={i}
                className="
                  px-4 py-3
                  rounded-xl
                  bg-[#f8fafc]
                  border border-slate-200
                  text-slate-700
                "
              >
                ✨ {gem}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TRANSPORT */}
      {plan.transport && (
        <div
          className="
            bg-white
            border border-slate-200
            rounded-2xl
            p-6
            shadow-sm
          "
        >
          <div className="flex items-center gap-3 mb-6">
            <Car className="text-green-400" />

            <h2 className="text-2xl font-bold text-slate-950">
              Transport Options
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {plan.transport.map((t, i) => (
              <div
                key={i}
                className="
                  px-5 py-3 rounded-xl
                  bg-[#f8fafc]
                  border border-slate-200
                  text-slate-700
                "
              >
                🚕 {t.type || t}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BUDGET */}
      <div
        className="
          bg-white
          border border-slate-200
          rounded-2xl
          p-6
          shadow-sm
        "
      >
        <div className="flex items-center gap-3 mb-6">
          <Wallet className="text-cyan-400" />

          <h2 className="text-2xl font-bold text-slate-950">
            Cost Breakdown
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          <div
            className="
              p-5 rounded-2xl
              bg-[#f8fafc]
              border border-slate-200
            "
          >
            <p className="text-slate-500">Hotel</p>

            <h2 className="text-2xl font-bold mt-2 text-slate-950">
              ₹{plan.breakdown?.hotel || 0}
            </h2>
          </div>

          <div
            className="
              p-5 rounded-2xl
              bg-[#f8fafc]
              border border-slate-200
            "
          >
            <p className="text-slate-500">Food</p>

            <h2 className="text-2xl font-bold mt-2 text-slate-950">
              ₹{plan.breakdown?.food || 0}
            </h2>
          </div>

          <div
            className="
              p-5 rounded-2xl
              bg-[#f8fafc]
              border border-slate-200
            "
          >
            <p className="text-slate-500">Travel</p>

            <h2 className="text-2xl font-bold mt-2 text-slate-950">
              ₹{plan.breakdown?.travel || 0}
            </h2>
          </div>

          <div
            className="
              p-5 rounded-2xl
              bg-[#f8fafc]
              border border-slate-200
            "
          >
            <p className="text-slate-500">Activities</p>

            <h2 className="text-2xl font-bold mt-2 text-slate-950">
              ₹{plan.breakdown?.activities || 0}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlanDisplay;