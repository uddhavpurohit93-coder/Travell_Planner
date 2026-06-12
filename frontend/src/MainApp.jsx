import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import HeroSection from "./components/HeroSection";
import TripForm from "./components/TripForm";
import WeatherBox from "./components/WeatherBox";
import PackingList from "./components/PackingList";
import HotelSection from "./components/HotelSection";
import PlanTimeline from "./components/PlanTimeline";
import FoodRecommendations from "./components/FoodRecommendations";
import HiddenGems from "./components/HiddenGems";
import BudgetEstimator from "./components/BudgetEstimator";
import TripList from "./components/TripList";
import Footer from "./components/Footer";

function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem("travelUser") || "{}");
  } catch {
    return {};
  }
}

function MainApp() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [budget, setBudget] = useState("");
  const [days, setDays] = useState("");
  const [trip, setTrip] = useState(null);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = getCurrentUser();
  const userId = user.id || "default-user";
  const token = localStorage.getItem("travelToken") || "";

  const fetchTrips = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/trips/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setTrips(data.data);
    } catch (err) {
      console.log("Fetch trips error:", err);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const validateDate = (selectedDate) => {
    if (!selectedDate) return "Please select a travel date.";
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const chosen = new Date(selectedDate);
    if (chosen < today)
      return "Travel date cannot be in the past. Please choose a future date.";
    return null;
  };

  const handleGenerate = async () => {
    if (!destination || !date || !budget || !days) {
      alert("Please fill all fields");
      return;
    }

    const dateError = validateDate(date);
    if (dateError) {
      alert(dateError);
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/add-trip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          destination,
          date,
          budget: Number(budget),
          days: Number(days),
          userId,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Trip generation failed");
        return;
      }

      const generatedTrip = data.data || data;
      setTrip(generatedTrip);
      fetchTrips();
    } catch (err) {
      console.log("Generate error:", err);
      alert("Server error. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (!trip) return alert("Please generate an AI trip first.");
    fetchTrips();
    alert("Trip saved!");
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/delete-trip/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTrips();
    } catch (err) {
      console.log(err);
    }
  };

  const tripHotels = trip?.plan?.hotels || trip?.hotels || [];
  const tripDayPlan = trip?.plan?.dayPlan || [];
  const tripHiddenGems = trip?.plan?.hiddenGems || [];
  const tripBreakdown = trip?.plan?.breakdown || null;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">

      {/* HERO */}
      <HeroSection search={search} setSearch={setSearch} />

      <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-24 space-y-28">

        {/* FORM CARD (FIXED + PREMIUM DARK MODE) */}
        <div className="flex justify-center">
          <div className="w-full max-w-6xl">

            <div className="
              bg-white dark:bg-slate-900
              border border-slate-200 dark:border-slate-700
              rounded-[40px]
              p-10 md:p-12
              shadow-xl dark:shadow-black/40
              transition-all
            ">

              <TripForm
                destination={destination}
                setDestination={setDestination}
                date={date}
                setDate={setDate}
                budget={budget}
                setBudget={setBudget}
                days={days}
                setDays={setDays}
                onGenerate={handleGenerate}
                onSubmit={handleSave}
                loading={loading}
              />

              {loading && (
                <p className="mt-6 text-center text-cyan-500 font-semibold animate-pulse">
                  ✨ Generating your AI trip...
                </p>
              )}

              {trip && destination && !loading && (
                <div className="mt-8 flex justify-center">
                  <button
                    onClick={() =>
                      navigate(
                        `/map?destination=${encodeURIComponent(destination)}`
                      )
                    }
                    className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold shadow-lg hover:scale-[1.02] transition"
                  >
                    🗺️ Explore {destination}
                  </button>
                </div>
              )}

              {trip?.weather && (
                <div className="mt-10">
                  <WeatherBox weather={trip.weather} />
                </div>
              )}

              {trip?.packingList && (
                <div className="mt-10">
                  <PackingList items={trip.packingList} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* HOTELS */}
        {tripHotels.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-5xl font-black text-slate-900 dark:text-white">
              Luxury Hotels 🏨
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              Premium stays curated by AI
            </p>
            <HotelSection hotels={tripHotels} />
          </section>
        )}

        {/* TIMELINE */}
        {tripDayPlan.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-5xl font-black text-slate-900 dark:text-white">
              Travel Timeline ✈️
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              Your complete AI journey
            </p>
            <PlanTimeline dayPlan={tripDayPlan} />
          </section>
        )}

        {/* FOOD */}
        {trip && destination && (
          <FoodRecommendations
            destination={destination}
            foodData={trip?.plan?.foodRecommendations || null}
          />
        )}

        {/* HIDDEN GEMS */}
        {tripHiddenGems.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-5xl font-black text-slate-900 dark:text-white">
              Hidden Gems 💎
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              Secret places to explore
            </p>
            <HiddenGems gems={tripHiddenGems} destination={destination} />
          </section>
        )}

        {/* BUDGET */}
        {tripBreakdown && (
          <section className="space-y-6">
            <h2 className="text-5xl font-black text-slate-900 dark:text-white">
              Budget Breakdown 💰
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              Smart expense planning
            </p>
            <BudgetEstimator
              breakdown={tripBreakdown}
              totalBudget={budget}
              days={days}
            />
          </section>
        )}

        {/* SAVED TRIPS */}
        <section className="space-y-10">
          <TripList
            trips={trips}
            search={search}
            onEdit={(t) => {
              setDestination(t.destination);
              setDate(t.date);
              setBudget(t.budget);
              setDays(t.days);
              setTrip(t);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onDelete={handleDelete}
          />
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default MainApp;