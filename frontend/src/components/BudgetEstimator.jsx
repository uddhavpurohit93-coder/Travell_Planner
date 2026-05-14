import {
  Hotel,
  UtensilsCrossed,
  Plane,
  Ticket
} from "lucide-react";

function BudgetEstimator({ breakdown }) {

  if (!breakdown) return null;

  const cards = [
    {
      title: "Hotel",
      value: breakdown.hotel,
      icon: <Hotel size={24} />,
      color: "text-cyan-400"
    },
    {
      title: "Food",
      value: breakdown.food,
      icon: <UtensilsCrossed size={24} />,
      color: "text-orange-400"
    },
    {
      title: "Travel",
      value: breakdown.travel,
      icon: <Plane size={24} />,
      color: "text-green-400"
    },
    {
      title: "Activities",
      value: breakdown.activities,
      icon: <Ticket size={24} />,
      color: "text-pink-400"
    }
  ];

  return (

    <section>

      {/* HEADER */}

      <div className="mb-12">

        <p className="
          text-cyan-400
          uppercase tracking-[5px]
          text-sm font-semibold
        ">

          Cost Analysis

        </p>

        <h2 className="
          text-5xl font-bold
          mt-4
        ">

          Budget Breakdown 💰

        </h2>

      </div>

      {/* CARDS */}

      <div className="
        grid md:grid-cols-2
        xl:grid-cols-4
        gap-8
      ">

        {cards.map((card, index) => (

          <div
            key={index}
            className="
              bg-[#101826]
              border border-white/10
              rounded-[32px]
              p-8
              hover:-translate-y-2
              transition-all duration-500
            "
          >

            <div className={`
              w-16 h-16
              rounded-2xl
              bg-white/5
              border border-white/10
              flex items-center justify-center
              ${card.color}
            `}>

              {card.icon}

            </div>

            <p className="
              text-gray-400
              mt-8
            ">

              {card.title}

            </p>

            <h2 className="
              text-5xl font-bold
              mt-3
            ">

              ₹{card.value}

            </h2>

          </div>

        ))}

      </div>

    </section>
  );
}

export default BudgetEstimator;