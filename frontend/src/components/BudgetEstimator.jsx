import { Hotel, UtensilsCrossed, Plane, Ticket, AlertTriangle, TrendingUp, CheckCircle, Info } from "lucide-react";

// ── Budget thresholds (in INR) ──────────────────────────────────────────
const MINIMUM_BUDGET = 2000;
const LOW_BUDGET = 5000;
const IDEAL_BUDGET = 15000;

function BudgetEstimator({ breakdown, totalBudget, days }) {
  if (!breakdown) return null;

  const hotel      = Number(breakdown.hotel)      || 0;
  const food       = Number(breakdown.food)        || 0;
  const travel     = Number(breakdown.travel)      || 0;
  const activities = Number(breakdown.activities)  || 0;

  const estimatedTotal = hotel + food + travel + activities;
  const inputBudget    = Number(totalBudget) || estimatedTotal;
  const overBudget     = estimatedTotal > inputBudget;
  const diff           = Math.abs(estimatedTotal - inputBudget);
  const perDay         = days && days > 0 ? Math.round(estimatedTotal / days) : null;

  // ── Budget health status ───────────────────────────────────────────────
  let statusLabel, statusColor, StatusIcon, statusBg, statusBorder;
  if (inputBudget < MINIMUM_BUDGET) {
    statusLabel  = "Budget Too Low";
    statusColor  = "text-red-600";
    StatusIcon   = AlertTriangle;
    statusBg     = "bg-red-50";
    statusBorder = "border-red-200";
  } else if (inputBudget < LOW_BUDGET) {
    statusLabel  = "Very Tight Budget";
    statusColor  = "text-orange-600";
    StatusIcon   = AlertTriangle;
    statusBg     = "bg-orange-50";
    statusBorder = "border-orange-200";
  } else if (overBudget) {
    statusLabel  = "Over Budget";
    statusColor  = "text-red-600";
    StatusIcon   = AlertTriangle;
    statusBg     = "bg-red-50";
    statusBorder = "border-red-200";
  } else if (inputBudget >= IDEAL_BUDGET) {
    statusLabel  = "Comfortable Budget";
    statusColor  = "text-green-600";
    StatusIcon   = CheckCircle;
    statusBg     = "bg-green-50";
    statusBorder = "border-green-200";
  } else {
    statusLabel  = "Moderate Budget";
    statusColor  = "text-yellow-600";
    StatusIcon   = TrendingUp;
    statusBg     = "bg-yellow-50";
    statusBorder = "border-yellow-200";
  }

  const cards = [
    { title: "Hotel",      value: hotel,      icon: Hotel,            color: "text-cyan-500",   bg: "bg-cyan-50",   border: "border-cyan-100",   glow: "bg-cyan-400/20",   bar: "from-cyan-400 to-cyan-500"   },
    { title: "Food",       value: food,        icon: UtensilsCrossed,  color: "text-orange-500", bg: "bg-orange-50", border: "border-orange-100", glow: "bg-orange-400/20", bar: "from-orange-400 to-orange-500" },
    { title: "Travel",     value: travel,      icon: Plane,            color: "text-green-500",  bg: "bg-green-50",  border: "border-green-100",  glow: "bg-green-400/20",  bar: "from-green-400 to-green-500"  },
    { title: "Activities", value: activities,  icon: Ticket,           color: "text-pink-500",   bg: "bg-pink-50",   border: "border-pink-100",   glow: "bg-pink-400/20",   bar: "from-pink-400 to-pink-500"    },
  ];

  return (
    <section className="relative bg-white rounded-[36px] border border-slate-200 shadow-[0_25px_80px_rgba(15,23,42,0.08)] p-8 overflow-hidden">
      {/* BG GLOWS */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-100/60 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-100/50 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10">

        {/* HEADER */}
        <div className="mb-10 bg-white border border-slate-200 rounded-[30px] p-7 shadow-[0_18px_45px_rgba(15,23,42,0.07)]">
          <p className="text-cyan-500 uppercase tracking-[5px] text-sm font-semibold">Cost Analysis</p>
          <h2 className="text-5xl font-bold mt-4 text-slate-900">Budget Breakdown 💰</h2>
          <p className="text-slate-500 mt-5 text-lg max-w-2xl">
            Smart expense planning for your complete travel budget.
          </p>
        </div>

        {/* STATUS BANNER */}
        <div className={`flex items-start gap-4 p-5 rounded-2xl border ${statusBg} ${statusBorder} mb-8`}>
          <div className={`mt-0.5 ${statusColor}`}>
            <StatusIcon size={22} />
          </div>
          <div className="flex-1">
            <p className={`font-bold text-lg ${statusColor}`}>{statusLabel}</p>
            {inputBudget < MINIMUM_BUDGET && (
              <p className="text-red-500 text-sm mt-1">
                ₹{inputBudget.toLocaleString()} is below the minimum recommended budget of ₹{MINIMUM_BUDGET.toLocaleString()} for any trip. Please increase your budget for a comfortable experience.
              </p>
            )}
            {inputBudget >= MINIMUM_BUDGET && inputBudget < LOW_BUDGET && (
              <p className="text-orange-600 text-sm mt-1">
                ₹{inputBudget.toLocaleString()} is quite tight. You may need to compromise on accommodation or activities. Consider increasing to ₹{LOW_BUDGET.toLocaleString()}+.
              </p>
            )}
            {overBudget && inputBudget >= LOW_BUDGET && (
              <p className="text-red-500 text-sm mt-1">
                Your AI plan costs ₹{estimatedTotal.toLocaleString()}, which exceeds your ₹{inputBudget.toLocaleString()} budget by <strong>₹{diff.toLocaleString()}</strong>. Consider reducing days or budget per category.
              </p>
            )}
            {!overBudget && inputBudget >= LOW_BUDGET && inputBudget < IDEAL_BUDGET && (
              <p className="text-yellow-600 text-sm mt-1">
                You have ₹{diff.toLocaleString()} remaining after this plan. It covers essentials but leaves little room for extras.
              </p>
            )}
            {!overBudget && inputBudget >= IDEAL_BUDGET && (
              <p className="text-green-600 text-sm mt-1">
                Great! You have ₹{diff.toLocaleString()} as buffer — enough for spontaneous purchases and comfort upgrades.
              </p>
            )}
          </div>
        </div>

        {/* SUMMARY ROW */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Your Budget",     value: `₹${inputBudget.toLocaleString()}`,     sub: "entered by you",    color: "text-blue-600"  },
            { label: "Estimated Cost",  value: `₹${estimatedTotal.toLocaleString()}`,  sub: "AI plan total",     color: overBudget ? "text-red-500" : "text-green-600" },
            { label: "Remaining",       value: overBudget ? `-₹${diff.toLocaleString()}` : `₹${diff.toLocaleString()}`, sub: overBudget ? "over budget" : "buffer left", color: overBudget ? "text-red-500" : "text-green-600" },
            { label: "Per Day",         value: perDay ? `₹${perDay.toLocaleString()}` : "—", sub: days ? `for ${days} days` : "enter days", color: "text-purple-600" },
          ].map(({ label, value, sub, color }) => (
            <div key={label} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
              <p className="text-slate-400 text-xs uppercase tracking-widest">{label}</p>
              <p className={`text-2xl font-black mt-1 ${color}`}>{value}</p>
              <p className="text-slate-400 text-xs mt-1">{sub}</p>
            </div>
          ))}
        </div>

        {/* CATEGORY CARDS */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          {cards.map((card) => {
            const pct = estimatedTotal > 0 ? Math.round((card.value / estimatedTotal) * 100) : 0;
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="group relative overflow-hidden bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-[32px] p-8 shadow-[0_16px_40px_rgba(15,23,42,0.08)] hover:shadow-[0_28px_70px_rgba(15,23,42,0.16)] hover:-translate-y-2 transition-all duration-500"
              >
                <div className={`absolute -top-12 -right-12 w-40 h-40 ${card.glow} rounded-full blur-3xl opacity-70 group-hover:opacity-100 transition-all duration-500`} />

                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-2xl ${card.bg} border ${card.border} flex items-center justify-center ${card.color} shadow-[0_10px_25px_rgba(15,23,42,0.08)] group-hover:scale-110 transition-transform duration-500`}>
                    <Icon size={24} />
                  </div>

                  <p className="text-slate-500 mt-8 font-medium">{card.title}</p>

                  <h2 className="text-4xl font-bold mt-2 text-slate-900">
                    {card.value > 0 ? `₹${card.value.toLocaleString()}` : <span className="text-slate-300 text-2xl">—</span>}
                  </h2>

                  {/* Progress bar */}
                  <div className="mt-5">
                    <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                      <span>Share of total</span>
                      <span className="font-semibold text-slate-600">{pct}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-2 rounded-full bg-gradient-to-r ${card.bar} transition-all duration-700`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>

                  {/* Low value hint */}
                  {card.value === 0 && (
                    <div className="mt-4 flex items-center gap-1.5 text-slate-400 text-xs">
                      <Info size={12} />
                      <span>Not allocated by AI</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* TOTAL FOOTER */}
        <div className={`mt-10 rounded-2xl border p-6 flex flex-col md:flex-row items-center justify-between gap-4 ${overBudget ? "bg-red-50 border-red-200" : "bg-gradient-to-r from-cyan-50 to-blue-50 border-blue-100"}`}>
          <div>
            <p className="text-slate-500 font-medium text-sm">AI Estimated Total</p>
            <p className={`text-4xl font-black mt-1 ${overBudget ? "text-red-500" : "text-slate-900"}`}>
              ₹{estimatedTotal.toLocaleString()}
            </p>
          </div>
          {overBudget ? (
            <div className="flex items-center gap-2 bg-red-100 border border-red-200 rounded-xl px-5 py-3">
              <AlertTriangle size={18} className="text-red-500" />
              <span className="text-red-600 font-semibold">₹{diff.toLocaleString()} over your budget</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-green-100 border border-green-200 rounded-xl px-5 py-3">
              <CheckCircle size={18} className="text-green-500" />
              <span className="text-green-600 font-semibold">₹{diff.toLocaleString()} within budget</span>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

export default BudgetEstimator;
