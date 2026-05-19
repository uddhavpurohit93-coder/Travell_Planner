import { useEffect, useState } from "react";

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

function MainApp() {
  const [search, setSearch] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [budget, setBudget] = useState("");
  const [days, setDays] = useState("");
  const [trip, setTrip] = useState(null);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTrips = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/trips/default-user");
      const data = await res.json();

      console.log("FETCH TRIPS:", data);

      if (data.success) {
        setTrips(data.data);
      }
    } catch (err) {
      console.log("Fetch trips error:", err);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleGenerate = async () => {
    if (!destination || !date || !budget || !days) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/add-trip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          destination,
          date,
          budget: Number(budget),
          days: Number(days),
          userId: "default-user",
        }),
      });

      const data = await res.json();

      console.log("GENERATE RESPONSE:", data);

      if (!res.ok) {
        alert(data.message || "Trip generate failed");
        return;
      }

      const generatedTrip = data.data || data;
      setTrip(generatedTrip);

      fetchTrips();
    } catch (err) {
      console.log("Generate error:", err);
      alert("Server error. Backend check karo.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!trip) {
      alert("Pehle Generate AI Trip karo");
      return;
    }

    fetchTrips();
    alert("Trip already saved");
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/delete-trip/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      console.log("DELETE RESPONSE:", data);

      fetchTrips();
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden">
      <HeroSection search={search} setSearch={setSearch} />

      <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-24 space-y-28">
        {/* TOP SECTION */}
        <div className="flex justify-center items-start">
          <div className="w-full max-w-7xl">
            <div className="bg-white border border-slate-200 rounded-[40px] p-12 shadow-xl shadow-slate-200/70">
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
                <p className="mt-6 text-center text-cyan-500 font-bold">
                  Generating your AI trip...
                </p>
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

        {trip?.hotels?.length > 0 && (
          <section className="space-y-10">
            <div>
              <h2 className="text-5xl font-black text-slate-900">
                Luxury Hotels 🏨
              </h2>
              <p className="text-slate-500 mt-4 text-lg">
                Premium stays curated by AI
              </p>
            </div>

            <HotelSection hotels={trip.hotels} />
          </section>
        )}

        {trip?.plan?.dayPlan?.length > 0 && (
          <section className="space-y-10">
            <div>
              <h2 className="text-5xl font-black text-slate-900">
                Travel Timeline ✈️
              </h2>
              <p className="text-slate-500 mt-4 text-lg">
                Your complete AI trip experience
              </p>
            </div>

            <PlanTimeline dayPlan={trip.plan.dayPlan} />
          </section>
        )}

        {trip?.plan?.foodRecommendations?.length > 0 && (
          <section className="space-y-10">
            <div>
              <h2 className="text-5xl font-black text-slate-900">
                Food Recommendations 🍕
              </h2>
              <p className="text-slate-500 mt-4 text-lg">
                Famous cafes & restaurants
              </p>
            </div>

            <FoodRecommendations foods={trip.plan.foodRecommendations} />
          </section>
        )}

        {trip?.plan?.hiddenGems?.length > 0 && (
          <section className="space-y-10">
            <div>
              <h2 className="text-5xl font-black text-slate-900">
                Hidden Gems 💎
              </h2>
              <p className="text-slate-500 mt-4 text-lg">
                Explore secret places beyond tourist spots
              </p>
            </div>

            <HiddenGems gems={trip.plan.hiddenGems} />
          </section>
        )}

        {trip?.plan?.breakdown && (
          <section className="space-y-10">
            <div>
              <h2 className="text-5xl font-black text-slate-900">
                Budget Breakdown 💰
              </h2>
              <p className="text-slate-500 mt-4 text-lg">
                Smart expense planning
              </p>
            </div>

            <BudgetEstimator breakdown={trip.plan.breakdown} />
          </section>
        )}

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

              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
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