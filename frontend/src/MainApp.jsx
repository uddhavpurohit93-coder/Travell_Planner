import { useState, useEffect, useCallback } from "react";

// icons
import {
  FaPlaneDeparture,
  FaMapMarkedAlt,
  FaCloudSun,
  FaWallet,
  FaSignOutAlt
} from "react-icons/fa";

// components
import TripForm from "./components/TripForm";
import TripList from "./components/TripList";
import WeatherBox from "./components/WeatherBox";
import TrendingDestinations from "./components/TrendingDestinations";
import UpcomingTrips from "./components/UpcomingTrips";

// services
import { getPlaces } from "./services/places";
import { getPlaceImage } from "./services/images";
import { getWeather } from "./services/weather";

const getRandomRating = () => (4 + Math.random()).toFixed(1);
const getRandomDistance = () => (Math.random() * 5).toFixed(1);

function MainApp() {

  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [budget, setBudget] = useState("");
  const [days, setDays] = useState("");
  const [search, setSearch] = useState("");

  const [trips, setTrips] = useState([]);
  const [plan, setPlan] = useState(null);
  const [weather, setWeatherState] = useState(null);

  const [editId, setEditId] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const token = localStorage.getItem("token");

  let userId = "";

  try {
    if (token) {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      userId = decoded.id;
    }
  } catch {
    console.log("Invalid token");
  }

  // SAFE JSON
  const safeJson = async (res) => {
    const text = await res.text();

    try {
      return JSON.parse(text);
    } catch {
      console.log(text);
      throw new Error(text);
    }
  };

  // ================= GET TRIPS =================
  const getTrips = useCallback(async () => {
    try {

      const res = await fetch(`http://localhost:5000/trips/${userId}`, {
        headers: {
          Authorization: "Bearer " + token
        }
      });

      const data = await safeJson(res);

      setTrips(data);

    } catch (err) {
      console.log(err);
    }
  }, [userId, token]);

  useEffect(() => {
    if (userId) {
      getTrips();
    }
  }, [getTrips, userId]);

  // ================= GENERATE PLAN =================
  const generatePlan = async () => {

    if (!destination || !days || !budget) {
      alert("Fill all fields");
      return;
    }

    const places = await getPlaces(destination);

    const dayPlan = [];

    for (let i = 0; i < Number(days); i++) {

      const place = places[i % places.length];

      const image = await getPlaceImage(place, destination);

      dayPlan.push({
        day: i + 1,
        place,
        image,
        rating: getRandomRating(),
        distance: getRandomDistance()
      });
    }

    const total = Number(budget);

    const newPlan = {
      dayPlan,

      hotel:
        total < 5000
          ? `${destination} Budget Stay`
          : total < 15000
            ? `${destination} 3 Star Hotel`
            : `${destination} Luxury Resort`,

      breakdown: {
        hotel: Math.round(total * 0.5),
        food: Math.round(total * 0.3),
        travel: Math.round(total * 0.2)
      }
    };

    setPlan(newPlan);

    const weatherData = await getWeather(destination);

    setWeatherState(weatherData);
  };

  // ================= ADD =================
  const handleSubmit = async () => {

    if (!destination || !date || !budget) {
      alert("Fill all fields");
      return;
    }

    if (!plan) {
      alert("Generate plan first 🚀");
      return;
    }

    try {

      const res = await fetch("http://localhost:5000/add-trip", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },

        body: JSON.stringify({
          destination,
          date,
          budget,
          userId,
          plan
        })
      });

      const data = await safeJson(res);

      if (!res.ok) {
        alert(data.message || "Save failed");
        return;
      }

      alert("Trip Added ✅");

      setDestination("");
      setDate("");
      setBudget("");
      setPlan(null);

      getTrips();

    } catch (err) {
      console.log(err);
    }
  };

  // ================= DELETE =================
  const deleteTrip = async (id) => {
    try {

      await fetch(`http://localhost:5000/delete-trip/${id}`, {
        method: "DELETE",

        headers: {
          Authorization: "Bearer " + token
        }
      });

      getTrips();

    } catch (err) {
      console.log(err);
    }
  };

  // ================= UPDATE =================
  const updateTrip = async () => {
    try {

      await fetch(`http://localhost:5000/update-trip/${editId}`, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },

        body: JSON.stringify({
          destination,
          date,
          budget,
          userId,
          plan
        })
      });

      setEditMode(false);
      setEditId(null);

      setDestination("");
      setDate("");
      setBudget("");
      setPlan(null);

      getTrips();

    } catch (err) {
      console.log(err);
    }
  };

  // ================= EDIT =================
  const handleEdit = (trip) => {

    setDestination(trip.destination);
    setDate(trip.date);
    setBudget(trip.budget);

    setPlan(trip.plan);

    setEditId(trip._id);

    setEditMode(true);
  };

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  // ================= TOTAL BUDGET =================
  const totalBudget = trips.reduce(
    (acc, trip) => acc + Number(trip.budget),
    0
  );

  // ================= UI =================
  return (

    <div className="min-h-screen bg-gradient-to-br from-[#071120] via-[#0a1b3d] to-[#09152a] text-white">

      {/* HERO */}
      <div
        className="h-[350px] bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80')"
        }}
      >

        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 p-8">

          {/* TOP BAR */}
          <div className="flex justify-between items-center">

            <div>
              <h1 className="text-4xl font-bold">
                Explore The World ✈️
              </h1>

              <p className="text-gray-300 mt-2">
                Plan your dream journey with AI Travel Planner
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 transition px-4 py-2 rounded-xl flex items-center gap-2"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>

          {/* SEARCH */}
          <div className="mt-8">
            <input
              placeholder="Search destination..."
              className="w-full md:w-[600px] p-4 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

        </div>
      </div>

      {/* DASHBOARD */}
      <div className="w-full max-w-[1800px] mx-auto p-6 -mt-16 relative z-20">

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

          <div className="bg-white/10 backdrop-blur-lg p-5 rounded-2xl shadow-xl">
            <FaPlaneDeparture className="text-3xl mb-3 text-blue-300" />
            <p className="text-gray-300">Total Trips</p>
            <h2 className="text-3xl font-bold">{trips.length}</h2>
          </div>

          <div className="bg-white/10 backdrop-blur-lg p-5 rounded-2xl shadow-xl">
            <FaWallet className="text-3xl mb-3 text-green-300" />
            <p className="text-gray-300">Total Budget</p>
            <h2 className="text-3xl font-bold">₹{totalBudget}</h2>
          </div>

          <div className="bg-white/10 backdrop-blur-lg p-5 rounded-2xl shadow-xl">
            <FaMapMarkedAlt className="text-3xl mb-3 text-pink-300" />
            <p className="text-gray-300">Current Destination</p>
            <h2 className="text-2xl font-bold">
              {destination || "None"}
            </h2>
          </div>

          <div className="bg-white/10 backdrop-blur-lg p-5 rounded-2xl shadow-xl">
            <FaCloudSun className="text-3xl mb-3 text-yellow-300" />
            <p className="text-gray-300">Weather</p>
            <h2 className="text-2xl font-bold">
              {weather?.temp || "--"}°
            </h2>
          </div>

        </div>

        {/* MAIN GRID */}
        <div className="grid xl:grid-cols-12 gap-6 items-start">

          {/* LEFT */}
          <div className="2xl:col-span-5 space-y-6">

            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-3xl shadow-2xl border border-white/10">

              <h2 className="text-2xl font-bold mb-4">
                Plan New Trip
              </h2>

              <TripForm
                destination={destination}
                setDestination={setDestination}
                date={date}
                setDate={setDate}
                budget={budget}
                setBudget={setBudget}
                days={days}
                setDays={setDays}
                onGenerate={generatePlan}
                onSubmit={handleSubmit}
                editMode={editMode}
                onUpdate={updateTrip}
              />

            </div>

            {/* WEATHER */}
            <div className="mt-6">
              <WeatherBox weather={weather} />
            </div>

          </div>

          {/* RIGHT */}
          <div className="2xl:col-span-7 space-y-6">
            {/* TRENDING */}
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-3xl shadow-2xl border border-white/10">

              <TrendingDestinations
                setDestination={setDestination}
              />

            </div>

            {/* UPCOMING */}
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-3xl shadow-2xl border border-white/10">

              <UpcomingTrips trips={trips} />

            </div>

          </div>

        </div>

        {/* TRIPS */}
        <div className="mt-8 bg-white/10 backdrop-blur-lg p-6 rounded-3xl shadow-2xl border border-white/10 overflow-hidden">

          <h2 className="text-3xl font-bold mb-6">
            My Trips ✈️
          </h2>

          <TripList
            trips={trips}
            search={search}
            onEdit={handleEdit}
            onDelete={deleteTrip}
          />

        </div>

      </div>

    </div>
  );
}

export default MainApp;