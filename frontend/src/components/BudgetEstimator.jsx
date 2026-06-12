import {
  Hotel,
  UtensilsCrossed,
  Plane,
  Ticket,
  AlertTriangle,
  TrendingUp,
  CheckCircle,
  Info,
} from "lucide-react";

const MINIMUM_BUDGET = 2000;
const LOW_BUDGET = 5000;
const IDEAL_BUDGET = 15000;

function BudgetEstimator({ breakdown, totalBudget, days }) {
  if (!breakdown) return null;

  const hotel = Number(breakdown.hotel) || 0;
  const food = Number(breakdown.food) || 0;
  const travel = Number(breakdown.travel) || 0;
  const activities = Number(breakdown.activities) || 0;

  const estimatedTotal = hotel + food + travel + activities;
  const inputBudget = Number(totalBudget) || estimatedTotal;
  const overBudget = estimatedTotal > inputBudget;
  const diff = Math.abs(estimatedTotal - inputBudget);
  const perDay =
    days && days > 0 ? Math.round(estimatedTotal / days) : null;

  let statusLabel, statusColor, StatusIcon, statusBg, statusBorder;

  if (inputBudget < MINIMUM_BUDGET) {
    statusLabel = "Budget Too Low";
    statusColor = "text-red-500";
    StatusIcon = AlertTriangle;
    statusBg = "bg-red-50 dark:bg-red-950/30";
    statusBorder = "border-red-200 dark:border-red-900";
  } else if (inputBudget < LOW_BUDGET) {
    statusLabel = "Very Tight Budget";
    statusColor = "text-orange-500";
    StatusIcon = AlertTriangle;
    statusBg = "bg-orange-50 dark:bg-orange-950/30";
    statusBorder = "border-orange-200 dark:border-orange-900";
  } else if (overBudget) {
    statusLabel = "Over Budget";
    statusColor = "text-red-500";
    StatusIcon = AlertTriangle;
    statusBg = "bg-red-50 dark:bg-red-950/30";
    statusBorder = "border-red-200 dark:border-red-900";
  } else if (inputBudget >= IDEAL_BUDGET) {
    statusLabel = "Comfortable Budget";
    statusColor = "text-green-500";
    StatusIcon = CheckCircle;
    statusBg = "bg-green-50 dark:bg-green-950/30";
    statusBorder = "border-green-200 dark:border-green-900";
  } else {
    statusLabel = "Moderate Budget";
    statusColor = "text-yellow-500";
    StatusIcon = TrendingUp;
    statusBg = "bg-yellow-50 dark:bg-yellow-950/30";
    statusBorder = "border-yellow-200 dark:border-yellow-900";
  }

  const cards = [
    {
      title: "Hotel",
      value: hotel,
      icon: Hotel,
      color: "text-cyan-500",
      bg: "bg-cyan-50 dark:bg-cyan-950/30",
      border: "border-cyan-100 dark:border-cyan-900",
      bar: "from-cyan-400 to-cyan-500",
    },
    {
      title: "Food",
      value: food,
      icon: UtensilsCrossed,
      color: "text-orange-500",
      bg: "bg-orange-50 dark:bg-orange-950/30",
      border: "border-orange-100 dark:border-orange-900",
      bar: "from-orange-400 to-orange-500",
    },
    {
      title: "Travel",
      value: travel,
      icon: Plane,
      color: "text-green-500",
      bg: "bg-green-50 dark:bg-green-950/30",
      border: "border-green-100 dark:border-green-900",
      bar: "from-green-400 to-green-500",
    },
    {
      title: "Activities",
      value: activities,
      icon: Ticket,
      color: "text-pink-500",
      bg: "bg-pink-50 dark:bg-pink-950/30",
      border: "border-pink-100 dark:border-pink-900",
      bar: "from-pink-400 to-pink-500",
    },
  ];

  return (
    <section className="
      relative overflow-hidden
      bg-white dark:bg-slate-950
      border border-slate-200 dark:border-slate-800
      rounded-[36px]
      p-8
      transition-colors duration-300
    ">

      {/* glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-100/60 dark:bg-cyan-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-100/50 dark:bg-blue-500/10 rounded-full blur-[120px]" />

      <div className="relative z-10">

        {/* HEADER */}
        <div className="
          mb-10 p-7 rounded-[30px]
          bg-white dark:bg-slate-900
          border border-slate-200 dark:border-slate-800
        ">
          <p className="text-cyan-500 uppercase tracking-[5px] text-sm font-semibold">
            Cost Analysis
          </p>

          <h2 className="text-5xl font-bold mt-4 text-slate-900 dark:text-white">
            Budget Breakdown 💰
          </h2>

          <p className="text-slate-500 dark:text-slate-400 mt-5 text-lg max-w-2xl">
            Smart expense planning for your complete travel budget.
          </p>
        </div>

        {/* STATUS */}
        <div className={`flex gap-4 p-5 rounded-2xl border mb-8 ${statusBg} ${statusBorder}`}>
          <StatusIcon className={statusColor} size={22} />

          <div>
            <p className={`font-bold text-lg ${statusColor}`}>
              {statusLabel}
            </p>

            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Estimated ₹{estimatedTotal.toLocaleString()} vs Budget ₹
              {inputBudget.toLocaleString()}
            </p>
          </div>
        </div>

        {/* SUMMARY */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            {
              label: "Your Budget",
              value: `₹${inputBudget.toLocaleString()}`,
            },
            {
              label: "Estimated",
              value: `₹${estimatedTotal.toLocaleString()}`,
            },
            {
              label: "Remaining",
              value: overBudget
                ? `-₹${diff.toLocaleString()}`
                : `₹${diff.toLocaleString()}`,
            },
            {
              label: "Per Day",
              value: perDay ? `₹${perDay.toLocaleString()}` : "—",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="
                bg-slate-50 dark:bg-slate-900
                border border-slate-200 dark:border-slate-800
                rounded-2xl p-4 text-center
              "
            >
              <p className="text-slate-400 text-xs uppercase tracking-widest">
                {item.label}
              </p>
              <p className="text-2xl font-black mt-1 text-slate-900 dark:text-white">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          {cards.map((card) => {
            const Icon = card.icon;
            const pct =
              estimatedTotal > 0
                ? Math.round((card.value / estimatedTotal) * 100)
                : 0;

            return (
              <div
                key={card.title}
                className="
                  relative overflow-hidden
                  rounded-[32px]
                  bg-white dark:bg-slate-900
                  border border-slate-200 dark:border-slate-800
                  p-8
                  shadow-lg dark:shadow-black/30
                  hover:-translate-y-2
                  transition-all duration-500
                "
              >
                <Icon className={card.color} size={24} />

                <p className="text-slate-500 dark:text-slate-400 mt-6">
                  {card.title}
                </p>

                <h2 className="text-3xl font-black mt-2 text-slate-900 dark:text-white">
                  ₹{card.value.toLocaleString()}
                </h2>

                <div className="mt-5">
                  <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-2 bg-gradient-to-r ${card.bar}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-2">
                    {pct}% of total
                  </p>
                </div>

                {card.value === 0 && (
                  <div className="mt-4 text-xs text-slate-400 flex items-center gap-1">
                    <Info size={12} /> Not allocated
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* FOOTER */}
        <div
          className={`
            mt-10 p-6 rounded-2xl border flex justify-between items-center
            ${
              overBudget
                ? "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900"
                : "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900"
            }
          `}
        >
          <p className="font-bold text-slate-700 dark:text-slate-300">
            Total: ₹{estimatedTotal.toLocaleString()}
          </p>

          <p className={overBudget ? "text-red-500" : "text-green-500"}>
            {overBudget
              ? `Over by ₹${diff.toLocaleString()}`
              : `Within budget`}
          </p>
        </div>

      </div>
    </section>
  );
}

export default BudgetEstimator;