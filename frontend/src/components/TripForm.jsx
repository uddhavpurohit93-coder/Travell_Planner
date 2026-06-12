import { useState } from "react";
import {
  MapPin,
  CalendarDays,
  Wallet,
  Clock3,
  Sparkles,
  AlertTriangle,
  Info,
} from "lucide-react";

const MIN_BUDGET = 500;
const LOW_BUDGET = 5000;

function TripForm({
  destination,
  setDestination,
  date,
  setDate,
  budget,
  setBudget,
  days,
  setDays,
  onGenerate,
  onSubmit,
  editMode,
  onUpdate,
  loading,
}) {
  const [budgetError, setBudgetError] = useState("");
  const [daysError, setDaysError] = useState("");
  const [dateError, setDateError] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const inputBase = `
    w-full px-5 py-4 rounded-2xl
    bg-white dark:bg-slate-900
    text-slate-900 dark:text-white
    placeholder:text-slate-400 dark:placeholder:text-slate-500
    border outline-none shadow-sm
    transition-all duration-300
    focus:ring-2
  `;

  const inputOk = `
    ${inputBase}
    border-slate-200 dark:border-slate-700
    focus:border-cyan-400 focus:ring-cyan-100
    dark:focus:ring-cyan-900/30
  `;

  const inputErr = `
    ${inputBase}
    border-red-300 dark:border-red-700
    focus:border-red-400 focus:ring-red-100
    dark:focus:ring-red-900/30
    bg-red-50/30 dark:bg-red-950/20
  `;

  const handleBudget = (val) => {
    setBudget(val);
    const n = Number(val);

    if (!val || val === "") {
      setBudgetError("Budget is required");
      return;
    }

    if (isNaN(n) || n <= 0) {
      setBudgetError("Please enter a valid positive number");
      return;
    }

    if (n < MIN_BUDGET) {
      setBudgetError(
        `Minimum budget is ₹${MIN_BUDGET.toLocaleString()}`
      );
      return;
    }

    setBudgetError("");
  };

  const handleDays = (val) => {
    setDays(val);

    const n = Number(val);

    if (!val || val === "") {
      setDaysError("Number of days is required");
      return;
    }

    if (!Number.isInteger(n) || n < 1) {
      setDaysError("Enter at least 1 day");
      return;
    }

    if (n > 30) {
      setDaysError("Maximum 30 days per trip");
      return;
    }

    setDaysError("");
  };

  const handleDate = (val) => {
    setDate(val);

    if (!val) {
      setDateError("Please select a travel date");
      return;
    }

    if (val < today) {
      setDateError("Travel date cannot be in the past");
      return;
    }

    setDateError("");
  };

  const budgetNum = Number(budget);

  let budgetHint = null;

  if (budget && !budgetError) {
    if (budgetNum < LOW_BUDGET) {
      budgetHint = {
        text: `₹${budgetNum.toLocaleString()} is a very tight budget. Expect basic accommodation.`,
        warn: true,
      };
    } else if (budgetNum < 15000) {
      budgetHint = {
        text: `₹${budgetNum.toLocaleString()} is a moderate budget — good for comfortable travel.`,
        warn: false,
      };
    } else {
      budgetHint = {
        text: `₹${budgetNum.toLocaleString()} — great budget for a comfortable trip!`,
        warn: false,
      };
    }
  }

  const hasErrors =
    !!budgetError || !!daysError || !!dateError;

  return (
  <div
    id="trip-form"
    className="
      relative
      rounded-[34px]
      bg-white/90
      dark:bg-slate-900/90
      backdrop-blur-xl
      border
      border-slate-200
      dark:border-slate-700
      shadow-[0_25px_80px_rgba(15,23,42,0.16)]
      dark:shadow-[0_25px_80px_rgba(0,0,0,0.45)]
      ring-1
      ring-slate-100
      dark:ring-slate-800
      px-7
      md:px-12
      py-10
      overflow-hidden
    "
    >
      <div
        className="
        absolute inset-0 rounded-[34px]
        bg-gradient-to-br
        from-cyan-50/70
        via-white
        to-blue-50/60
        dark:from-cyan-950/20
        dark:via-slate-900
        dark:to-blue-950/20
        pointer-events-none
      "
      />

      <div className="absolute -top-24 -right-24 w-72 h-72 bg-cyan-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-8">
        {/* HEADER */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-500 text-sm">
            <Sparkles size={16} />
            AI Travel Planner
          </div>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight text-slate-950 dark:text-white">
            Plan your next
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              dream adventure
            </span>
          </h1>

          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl">
            Generate personalized AI-powered itineraries with hotels,
            weather, hidden gems, food spots and smart travel
            recommendations.
          </p>
        </div>

        {/* FORM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Destination */}
          <div className="space-y-2">
            <label className="text-sm text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2">
              <MapPin size={15} />
              Destination
            </label>

            <input
              placeholder="Where do you want to go?"
              className={inputOk}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>

          {/* Date */}
          <div className="space-y-2">
            <label className="text-sm text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2">
              <CalendarDays size={15} />
              Travel Date
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
                <AlertTriangle size={12} />
                {dateError}
              </p>
            )}
          </div>

          {/* Budget */}
          <div className="space-y-2">
            <label className="text-sm text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2">
              <Wallet size={15} />
              Budget (₹)
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
                <AlertTriangle size={12} />
                {budgetError}
              </p>
            ) : budgetHint ? (
              <p
                className={`flex items-center gap-1.5 text-xs font-medium ${
                  budgetHint.warn
                    ? "text-orange-500"
                    : "text-green-600"
                }`}
              >
                <Info size={12} />
                {budgetHint.text}
              </p>
            ) : (
              <p className="text-slate-400 text-xs">
                Minimum: ₹{MIN_BUDGET.toLocaleString()}
              </p>
            )}
          </div>

          {/* Days */}
          <div className="space-y-2">
            <label className="text-sm text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2">
              <Clock3 size={15} />
              Number of Days
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
                <AlertTriangle size={12} />
                {daysError}
              </p>
            ) : (
              <p className="text-slate-400 text-xs">
                Between 1 – 30 days
              </p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 pt-2">
          <button
            onClick={onGenerate}
            disabled={
              loading ||
              hasErrors ||
              !destination ||
              !date ||
              !budget ||
              !days
            }
            className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold text-lg hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "✨ Generating..." : "✨ Generate AI Trip"}
          </button>

          {editMode ? (
            <button
              onClick={onUpdate}
              className="flex-1 py-4 rounded-2xl bg-yellow-500 text-slate-950 font-semibold text-lg hover:bg-yellow-400 transition-all"
            >
              Update Trip
            </button>
          ) : (
            <button
              onClick={onSubmit}
              className="flex-1 py-4 rounded-2xl bg-slate-900 dark:bg-slate-700 text-white font-semibold text-lg hover:bg-slate-800 dark:hover:bg-slate-600 transition-all duration-300 shadow-lg"
            >
              💾 Save Trip
            </button>
          )}
        </div>

        {/* Error Banner */}
        {hasErrors && (
          <div className="flex items-center gap-2 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-2xl px-5 py-3">
            <AlertTriangle
              size={16}
              className="text-red-500 flex-shrink-0"
            />
            <p className="text-red-600 dark:text-red-400 text-sm font-medium">
              Please fix the errors above before generating your trip.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TripForm;