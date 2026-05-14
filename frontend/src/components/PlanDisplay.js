import {
  MapPin,
  Star,
  Hotel,
  Wallet,
  Utensils,
  Compass,
  Car,
  Sparkles
} from "lucide-react";

function PlanDisplay({ plan }) {

  if (!plan) return null;

  return (

    <div className="space-y-8">

      {/* DAY PLANS */}

      <div>

        <div className="flex items-center gap-3 mb-6">

          <div className="
            w-10 h-10 rounded-xl
            bg-cyan-500/10
            flex items-center justify-center
            border border-cyan-400/20
          ">

            <Sparkles
              size={18}
              className="text-cyan-400"
            />

          </div>

          <div>

            <h2 className="
              text-3xl font-bold
            ">

              AI Itinerary

            </h2>

            <p className="text-gray-400">

              Personalized day-wise travel plan

            </p>

          </div>

        </div>

        <div className="
          grid md:grid-cols-2
          gap-6
        ">

          {plan.dayPlan?.map((d, i) => (

            <div
              key={i}
              className="
                bg-[#101826]
                border border-white/10
                rounded-2xl
                overflow-hidden
                hover:border-cyan-400/30
                transition-all duration-300
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

                <div className="
                  w-full h-60
                  bg-[#0d1522]
                " />

              )}

              {/* CONTENT */}

              <div className="p-5">

                <div className="
                  flex items-center
                  justify-between
                ">

                  <div>

                    <p className="
                      text-cyan-400
                      text-sm
                    ">

                      Day {d.day}

                    </p>

                    <h2 className="
                      text-2xl font-bold mt-1
                    ">

                      {d.place}

                    </h2>

                  </div>

                  <div className="
                    px-3 py-2 rounded-xl
                    bg-yellow-500/10
                    border border-yellow-400/20
                    text-yellow-300
                    flex items-center gap-1
                  ">

                    <Star size={15} />

                    {d.rating || "4.5"}

                  </div>

                </div>

                <div className="
                  mt-4
                  flex items-center gap-2
                  text-gray-400
                ">

                  <MapPin size={16} />

                  {d.distance || "2 km"} away

                </div>

                {d.description && (

                  <p className="
                    mt-4
                    text-gray-400
                    leading-relaxed
                  ">

                    {d.description}

                  </p>

                )}

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* HOTELS */}

      <div className="
        bg-[#101826]
        border border-white/10
        rounded-2xl
        p-6
      ">

        <div className="
          flex items-center gap-3 mb-6
        ">

          <Hotel
            className="text-cyan-400"
          />

          <h2 className="
            text-2xl font-bold
          ">

            Recommended Hotels

          </h2>

        </div>

        <div className="
          grid md:grid-cols-2 gap-5
        ">

          <div className="
            p-5 rounded-2xl
            bg-[#0d1522]
            border border-white/10
          ">

            <p className="
              text-gray-400 text-sm
            ">

              Budget Stay

            </p>

            <h3 className="
              text-xl font-bold mt-2
            ">

              {plan.hotel?.budget ||
                "Budget Hotel"}

            </h3>

          </div>

          <div className="
            p-5 rounded-2xl
            bg-[#0d1522]
            border border-white/10
          ">

            <p className="
              text-gray-400 text-sm
            ">

              Luxury Stay

            </p>

            <h3 className="
              text-xl font-bold mt-2
            ">

              {plan.hotel?.luxury ||
                "Luxury Resort"}

            </h3>

          </div>

        </div>

      </div>

      {/* FOOD */}

      {plan.foodRecommendations && (

        <div className="
          bg-[#101826]
          border border-white/10
          rounded-2xl
          p-6
        ">

          <div className="
            flex items-center gap-3 mb-6
          ">

            <Utensils
              className="text-orange-400"
            />

            <h2 className="
              text-2xl font-bold
            ">

              Food Spots

            </h2>

          </div>

          <div className="
            grid md:grid-cols-2
            gap-4
          ">

            {plan.foodRecommendations.map(
              (food, i) => (

                <div
                  key={i}
                  className="
                    p-5 rounded-2xl
                    bg-[#0d1522]
                    border border-white/10
                  "
                >

                  <h3 className="
                    text-lg font-bold
                  ">

                    {food.name}

                  </h3>

                  <p className="
                    text-gray-400 mt-2
                  ">

                    {food.description}

                  </p>

                </div>

              )
            )}

          </div>

        </div>

      )}

      {/* HIDDEN GEMS */}

      {plan.hiddenGems && (

        <div className="
          bg-[#101826]
          border border-white/10
          rounded-2xl
          p-6
        ">

          <div className="
            flex items-center gap-3 mb-6
          ">

            <Compass
              className="text-pink-400"
            />

            <h2 className="
              text-2xl font-bold
            ">

              Hidden Gems

            </h2>

          </div>

          <div className="
            flex flex-wrap gap-3
          ">

            {plan.hiddenGems.map(
              (gem, i) => (

                <div
                  key={i}
                  className="
                    px-4 py-3
                    rounded-xl
                    bg-[#0d1522]
                    border border-white/10
                  "
                >

                  ✨ {gem}

                </div>

              )
            )}

          </div>

        </div>

      )}

      {/* TRANSPORT */}

      {plan.transport && (

        <div className="
          bg-[#101826]
          border border-white/10
          rounded-2xl
          p-6
        ">

          <div className="
            flex items-center gap-3 mb-6
          ">

            <Car
              className="text-green-400"
            />

            <h2 className="
              text-2xl font-bold
            ">

              Transport Options

            </h2>

          </div>

          <div className="
            flex flex-wrap gap-3
          ">

            {plan.transport.map(
              (t, i) => (

                <div
                  key={i}
                  className="
                    px-5 py-3 rounded-xl
                    bg-[#0d1522]
                    border border-white/10
                  "
                >

                  🚕 {t.type || t}

                </div>

              )
            )}

          </div>

        </div>

      )}

      {/* BUDGET */}

      <div className="
        bg-[#101826]
        border border-white/10
        rounded-2xl
        p-6
      ">

        <div className="
          flex items-center gap-3 mb-6
        ">

          <Wallet
            className="text-cyan-400"
          />

          <h2 className="
            text-2xl font-bold
          ">

            Cost Breakdown

          </h2>

        </div>

        <div className="
          grid md:grid-cols-4
          gap-4
        ">

          <div className="
            p-5 rounded-2xl
            bg-[#0d1522]
            border border-white/10
          ">

            <p className="text-gray-400">

              Hotel

            </p>

            <h2 className="
              text-2xl font-bold mt-2
            ">

              ₹{plan.breakdown?.hotel || 0}

            </h2>

          </div>

          <div className="
            p-5 rounded-2xl
            bg-[#0d1522]
            border border-white/10
          ">

            <p className="text-gray-400">

              Food

            </p>

            <h2 className="
              text-2xl font-bold mt-2
            ">

              ₹{plan.breakdown?.food || 0}

            </h2>

          </div>

          <div className="
            p-5 rounded-2xl
            bg-[#0d1522]
            border border-white/10
          ">

            <p className="text-gray-400">

              Travel

            </p>

            <h2 className="
              text-2xl font-bold mt-2
            ">

              ₹{plan.breakdown?.travel || 0}

            </h2>

          </div>

          <div className="
            p-5 rounded-2xl
            bg-[#0d1522]
            border border-white/10
          ">

            <p className="text-gray-400">

              Activities

            </p>

            <h2 className="
              text-2xl font-bold mt-2
            ">

              ₹{plan.breakdown?.activities || 0}

            </h2>

          </div>

        </div>

      </div>

    </div>
  );
}

export default PlanDisplay;