import { useState } from "react";
import { MapPin, CalendarDays, Wallet, Clock3, Sparkles, AlertTriangle, Info } from "lucide-react";

const MIN_BUDGET = 500;
const LOW_BUDGET = 5000;

function TripForm({
  destination, setDestination,
  date, setDate,
  budget, setBudget,
  days, setDays,
  onGenerate, onSubmit,
  editMode, onUpdate,
  loading
}) {
  const [budgetError, setBudgetError] = useState("");
  const [daysError, setDaysError]     = useState("");
  const [dateError, setDateError]     = useState("");

  const today = new Date().toISOString().split("T")[0];

  const inputBase = `
    w-full px-5 py-4 rounded-2xl bg-white text-slate-900
    placeholder:text-slate-400 border outline-none shadow-sm
    transition-all duration-300
    focus:bg-white focus:text-slate-900 focus:ring-2
  `;
  const inputOk  = `${inputBase} border-slate-200 focus:border-cyan-400 focus:ring-cyan-100`;
  const inputErr = `${inputBase} border-red-300 focus:border-red-400 focus:ring-red-100 bg-red-50/30`;

  // ── Validators ──────────────────────────────────────────────────────────
  const handleBudget = (val) => {
    setBudget(val);
    const n = Number(val);
    if (!val || val === "") { setBudgetError("Budget is required"); return; }
    if (isNaN(n) || n <= 0)  { setBudgetError("Please enter a valid positive number"); return; }
    if (n < MIN_BUDGET)      { setBudgetError(`Minimum budget is ₹${MIN_BUDGET.toLocaleString()}`); return; }
    setBudgetError("");
  };

  const handleDays = (val) => {
    setDays(val);
    const n = Number(val);
    if (!val || val === "")  { setDaysError("Number of days is required"); return; }
    if (!Number.isInteger(n) || n < 1) { setDaysError("Enter at least 1 day"); return; }
    if (n > 30)              { setDaysError("Maximum 30 days per trip"); return; }
    setDaysError("");
  };

  const handleDate = (val) => {
    setDate(val);
    if (!val)       { setDateError("Please select a travel date"); return; }
    if (val < today){ setDateError("Travel date cannot be in the past"); return; }
    setDateError("");
  };

  // ── Budget hint text ─────────────────────────────────────────────────
  const budgetNum = Number(budget);
  let budgetHint = null;
  if (budget && !budgetError) {
    if (budgetNum < LOW_BUDGET) {
      budgetHint = { text: `₹${budgetNum.toLocaleString()} is a very tight budget. Expect basic accommodation.`, warn: true };
    } else if (budgetNum >= LOW_BUDGET && budgetNum < 15000) {
      budgetHint = { text: `₹${budgetNum.toLocaleString()} is a moderate budget — good for comfortable travel.`, warn: false };
    } else {
      budgetHint = { text: `₹${budgetNum.toLocaleString()} — great budget for a comfortable trip!`, warn: false };
    }
  }

  const hasErrors = !!budgetError || !!daysError || !!dateError;

  return (
    <div className="relative rounded-[34px] bg-white border border-slate-200 shadow-[0_25px_80px_rgba(15,23,42,0.16)] ring-1 ring-slate-100 px-7 md:px-12 py-10 overflow-hidden">
      <div className="absolute inset-0 rounded-[34px] bg-gradient-to-br from-cyan-50/70 via-white to-blue-50/60 pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-cyan-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-8">
        {/* HEADER */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-500 text-sm">
            <Sparkles size={16} /> AI Travel Planner
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight text-slate-950">
            Plan your next
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              dream adventure
            </span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl">
            Generate personalized AI-powered itineraries with hotels, weather, hidden gems, food spots and smart travel recommendations.
          </p>
        </div>

        {/* FORM GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* DESTINATION */}
          <div className="space-y-2">
            <label className="text-sm text-slate-500 font-medium flex items-center gap-2">
              <MapPin size={15} /> Destination
            </label>
            <input
              placeholder="Where do you want to go?"
              className={inputOk}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>

          {/* DATE */}
          <div className="space-y-2">
            <label className="text-sm text-slate-500 font-medium flex items-center gap-2">
              <CalendarDays size={15} /> Travel Date
            </label>
            <input
              type="date"
              className={dateError ? inputErr : inputOk}
              value={date}
              min={today}
              onChange={(e) => handleDate(e.target.value)}
            />
            {dateError && (
              <p className="flex items-center gap-1.5 text-red-500 text-xs font-semibold">
                <AlertTriangle size={12} /> {dateError}
              </p>
            )}
          </div>

          {/* BUDGET */}
          <div className="space-y-2">
            <label className="text-sm text-slate-500 font-medium flex items-center gap-2">
              <Wallet size={15} /> Budget (₹)
            </label>
            <input
              type="number"
              placeholder="e.g. 15000"
              className={budgetError ? inputErr : inputOk}
              value={budget}
              min={MIN_BUDGET}
              onChange={(e) => handleBudget(e.target.value)}
            />
            {budgetError ? (
              <p className="flex items-center gap-1.5 text-red-500 text-xs font-semibold">
                <AlertTriangle size={12} /> {budgetError}
              </p>
            ) : budgetHint ? (
              <p className={`flex items-center gap-1.5 text-xs font-medium ${budgetHint.warn ? "text-orange-500" : "text-green-600"}`}>
                <Info size={12} /> {budgetHint.text}
              </p>
            ) : (
              <p className="text-slate-400 text-xs">Minimum: ₹{MIN_BUDGET.toLocaleString()}</p>
            )}
          </div>

          {/* DAYS */}
          <div className="space-y-2">
            <label className="text-sm text-slate-500 font-medium flex items-center gap-2">
              <Clock3 size={15} /> Number of Days
            </label>
            <input
              type="number"
              placeholder="e.g. 3"
              className={daysError ? inputErr : inputOk}
              value={days}
              min={1}
              max={30}
              onChange={(e) => handleDays(e.target.value)}
            />
            {daysError ? (
              <p className="flex items-center gap-1.5 text-red-500 text-xs font-semibold">
                <AlertTriangle size={12} /> {daysError}
              </p>
            ) : (
              <p className="text-slate-400 text-xs">Between 1 – 30 days</p>
            )}
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col md:flex-row gap-4 pt-2">
          <button
            onClick={onGenerate}
            disabled={loading || hasErrors || !destination || !date || !budget || !days}
            className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold text-lg hover:opacity-90 hover:scale-[1.01] transition-all duration-300 shadow-lg shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
          >
            {loading ? "✨ Generating..." : "✨ Generate AI Trip"}
          </button>

          {editMode ? (
            <button
              onClick={onUpdate}
              className="flex-1 py-4 rounded-2xl bg-yellow-500 text-slate-950 font-semibold text-lg hover:bg-yellow-400 hover:scale-[1.01] transition-all duration-300"
            >
              Update Trip
            </button>
          ) : (
            <button
              onClick={onSubmit}
              className="flex-1 py-4 rounded-2xl bg-slate-900 text-white font-semibold text-lg hover:bg-slate-800 hover:scale-[1.01] transition-all duration-300 shadow-lg shadow-slate-900/25"
            >
              💾 Save Trip
            </button>
          )}
        </div>

        {/* GLOBAL ERROR HINT */}
        {hasErrors && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-2xl px-5 py-3">
            <AlertTriangle size={16} className="text-red-500 flex-shrink-0" />
            <p className="text-red-600 text-sm font-medium">
              Please fix the errors above before generating your trip.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TripForm;
