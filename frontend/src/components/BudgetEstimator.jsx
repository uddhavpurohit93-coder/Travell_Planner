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
      color: "text-cyan-500",
      bg: "bg-cyan-50",
      border: "border-cyan-100",
      glow: "bg-cyan-400/20"
    },
    {
      title: "Food",
      value: breakdown.food,
      icon: <UtensilsCrossed size={24} />,
      color: "text-orange-500",
      bg: "bg-orange-50",
      border: "border-orange-100",
      glow: "bg-orange-400/20"
    },
    {
      title: "Travel",
      value: breakdown.travel,
      icon: <Plane size={24} />,
      color: "text-green-500",
      bg: "bg-green-50",
      border: "border-green-100",
      glow: "bg-green-400/20"
    },
    {
      title: "Activities",
      value: breakdown.activities,
      icon: <Ticket size={24} />,
      color: "text-pink-500",
      bg: "bg-pink-50",
      border: "border-pink-100",
      glow: "bg-pink-400/20"
    }
  ];

  return (
    <section className="
      relative
      bg-white
      rounded-[36px]
      border border-slate-200
      shadow-[0_25px_80px_rgba(15,23,42,0.08)]
      p-8
      overflow-hidden
    ">

      {/* BACKGROUND GLOW */}
      <div className="
        absolute top-0 right-0
        w-80 h-80
        bg-cyan-100/60
        rounded-full
        blur-[120px]
        pointer-events-none
      " />

      <div className="
        absolute bottom-0 left-0
        w-80 h-80
        bg-blue-100/50
        rounded-full
        blur-[120px]
        pointer-events-none
      " />

      <div className="relative z-10">

        {/* HEADER */}
        <div className="
          mb-12
          bg-white
          border border-slate-200
          rounded-[30px]
          p-7
          shadow-[0_18px_45px_rgba(15,23,42,0.07)]
        ">

          <p className="
            text-cyan-500
            uppercase tracking-[5px]
            text-sm font-semibold
          ">
            Cost Analysis
          </p>

          <h2 className="
            text-5xl font-bold
            mt-4
            text-slate-900
          ">
            Budget Breakdown 💰
          </h2>

          <p className="
            text-slate-500
            mt-5
            text-lg
            max-w-2xl
          ">
            Smart expense planning for your complete travel budget.
          </p>

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
                group
                relative
                overflow-hidden
                bg-gradient-to-br
                from-white
                to-slate-50
                border border-slate-200
                rounded-[32px]
                p-8
                shadow-[0_16px_40px_rgba(15,23,42,0.08)]
                hover:shadow-[0_28px_70px_rgba(15,23,42,0.16)]
                hover:-translate-y-2
                transition-all duration-500
              "
            >

              <div className={`
                absolute -top-12 -right-12
                w-40 h-40
                ${card.glow}
                rounded-full
                blur-3xl
                opacity-70
                group-hover:opacity-100
                transition-all duration-500
              `} />

              <div className="relative z-10">

                <div className={`
                  w-16 h-16
                  rounded-2xl
                  ${card.bg}
                  border ${card.border}
                  flex items-center justify-center
                  ${card.color}
                  shadow-[0_10px_25px_rgba(15,23,42,0.08)]
                  group-hover:scale-110
                  transition-transform duration-500
                `}>
                  {card.icon}
                </div>

                <p className="
                  text-slate-500
                  mt-8
                  font-medium
                ">
                  {card.title}
                </p>

                <h2 className="
                  text-5xl font-bold
                  mt-3
                  text-slate-900
                ">
                  ₹{card.value}
                </h2>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default BudgetEstimator;