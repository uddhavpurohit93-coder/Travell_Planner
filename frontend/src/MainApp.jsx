import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
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

  const fetchTrips = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/trips/default-user");
      const data = await res.json();
      if (data.success) setTrips(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleGenerate = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/trips/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ destination, date, budget, days })
      });
      const data = await res.json();
      if (data.success) setTrip(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSave = async () => {
    try {
      await fetch("http://localhost:5000/api/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ destination, date, budget, days, ...trip })
      });
      fetchTrips();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/trips/${id}`, {
        method: "DELETE"
      });
      fetchTrips();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="
      min-h-screen
      bg-[#020817]
      text-white
      overflow-x-hidden
    ">

      <Navbar />

      <HeroSection
        search={search}
        setSearch={setSearch}
      />

      <div className="
        max-w-7xl mx-auto
        px-6 lg:px-10
        py-24 space-y-28
      ">

        {/* TOP GRID */}
        <div className="grid xl:grid-cols-3 gap-10 items-start">

          {/* LEFT */}
          <div className="xl:col-span-2">
            <div className="
              bg-gradient-to-br from-white/10 to-white/5
              border border-white/10
              rounded-[40px] p-8
              backdrop-blur-2xl
              shadow-2xl shadow-cyan-500/10
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
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-8">

            {/* STATS */}
            <div className="
              bg-gradient-to-br from-cyan-500/10 to-blue-500/10
              border border-cyan-400/20
              rounded-[40px] p-8
              backdrop-blur-2xl
            ">
              <p className="uppercase tracking-[5px] text-cyan-400 text-sm mb-5">
                Travel Insights
              </p>
              <h2 className="text-4xl font-black mb-10 leading-tight">
                AI Travel
                <span className="text-cyan-400"> Stats ✨</span>
              </h2>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-400">Total Trips</p>
                  <h2 className="text-5xl font-black mt-3">{trips.length}</h2>
                </div>
                <div>
                  <p className="text-gray-400">Budget</p>
                  <h2 className="text-4xl font-black mt-3">
                    ₹{trips.reduce((a, b) => a + (b.budget || 0), 0)}
                  </h2>
                </div>
              </div>
            </div>

            {trip?.weather && <WeatherBox weather={trip.weather} />}
            {trip?.packingList && <PackingList items={trip.packingList} />}

          </div>
        </div>

        {/* HOTELS */}
        {trip?.hotels?.length > 0 && (
          <section className="space-y-10">
            <div>
              <h2 className="text-5xl font-black">Luxury Hotels 🏨</h2>
              <p className="text-gray-400 mt-4 text-lg">Premium stays curated by AI</p>
            </div>
            <HotelSection hotels={trip.hotels} />
          </section>
        )}

        {/* TIMELINE */}
        {trip?.plan?.dayPlan?.length > 0 && (
          <section className="space-y-10">
            <div>
              <h2 className="text-5xl font-black">Travel Timeline ✈️</h2>
              <p className="text-gray-400 mt-4 text-lg">Your complete AI trip experience</p>
            </div>
            <PlanTimeline dayPlan={trip.plan.dayPlan} />
          </section>
        )}

        {/* FOOD */}
        {trip?.plan?.foodRecommendations?.length > 0 && (
          <section className="space-y-10">
            <div>
              <h2 className="text-5xl font-black">Food Recommendations 🍕</h2>
              <p className="text-gray-400 mt-4 text-lg">Famous cafes & restaurants</p>
            </div>
            <FoodRecommendations foods={trip.plan.foodRecommendations} />
          </section>
        )}

        {/* HIDDEN GEMS */}
        {trip?.plan?.hiddenGems?.length > 0 && (
          <section className="space-y-10">
            <div>
              <h2 className="text-5xl font-black">Hidden Gems 💎</h2>
              <p className="text-gray-400 mt-4 text-lg">Explore secret places beyond tourist spots</p>
            </div>
            <HiddenGems gems={trip.plan.hiddenGems} />
          </section>
        )}

        {/* BUDGET */}
        {trip?.plan?.breakdown && (
          <section className="space-y-10">
            <div>
              <h2 className="text-5xl font-black">Budget Breakdown 💰</h2>
              <p className="text-gray-400 mt-4 text-lg">Smart expense planning</p>
            </div>
            <BudgetEstimator breakdown={trip.plan.breakdown} />
          </section>
        )}

        {/* SAVED TRIPS */}
        <section className="space-y-10">
          <div>
            <h2 className="text-5xl font-black">My Trips ✈️</h2>
            <p className="text-gray-400 mt-4 text-lg">Your saved travel experiences</p>
          </div>
          <TripList
            trips={trips}
            search={search}
            onEdit={(t) => {
              setDestination(t.destination);
              setDate(t.date);
              setBudget(t.budget);
              setDays(t.days);
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