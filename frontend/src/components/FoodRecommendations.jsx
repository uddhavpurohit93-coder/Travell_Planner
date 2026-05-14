import {
  UtensilsCrossed,
  Star
} from "lucide-react";

function FoodRecommendations({ foods }) {

  if (!foods || foods.length === 0)
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

          Food & Dining

        </p>

        <h2 className="
          text-5xl font-bold
          mt-4
        ">

          Food Recommendations 🍽

        </h2>

        <p className="
          text-gray-400
          mt-5 text-lg
          max-w-2xl
        ">

          Discover famous cafes,
          restaurants and local
          food experiences.

        </p>

      </div>

      {/* FOOD GRID */}

      <div className="
        grid md:grid-cols-2
        xl:grid-cols-3
        gap-8
      ">

        {foods.map((food, index) => (

          <div
            key={index}
            className="
              group
              bg-[#101826]
              border border-white/10
              rounded-[32px]
              p-8
              hover:-translate-y-2
              hover:border-cyan-400/20
              transition-all duration-500
            "
          >

            <div className="
              w-16 h-16
              rounded-2xl
              bg-gradient-to-br
              from-orange-500/20
              to-red-500/20
              border border-orange-400/20
              flex items-center justify-center
            ">

              <UtensilsCrossed
                size={28}
                className="
                  text-orange-400
                "
              />

            </div>

            <div className="
              flex items-center
              justify-between mt-8
            ">

              <h2 className="
                text-2xl font-bold
              ">

                {food}

              </h2>

              <div className="
                flex items-center gap-1
                text-yellow-400
              ">

                <Star
                  size={16}
                  className="fill-yellow-400"
                />

                4.8

              </div>

            </div>

            <p className="
              text-gray-400
              mt-5 leading-relaxed
            ">

              Famous dining destination
              loved by travelers and
              locals for premium food
              experience.

            </p>

            <button className="
              mt-8
              px-5 py-3
              rounded-2xl
              bg-white/5
              border border-white/10
              hover:bg-cyan-500
              transition-all
            ">

              View Restaurant

            </button>

          </div>

        ))}

      </div>

    </section>
  );
}

export default FoodRecommendations;