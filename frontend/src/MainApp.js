import { useState, useEffect, useCallback } from "react";

// components
import TripForm from "./components/TripForm";
import PlanDisplay from "./components/PlanDisplay";
import TripList from "./components/TripList";
import WeatherBox from "./components/WeatherBox";
import MapBox from "./components/MapBox";

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

  // 🔥 SAFE JSON FUNCTION
  const safeJson = async (res) => {
    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch {
      console.log("SERVER RESPONSE:", text);
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
      console.log("GET TRIPS ERROR:", err.message);
    }
  }, [userId, token]);

  useEffect(() => {
    if (userId) getTrips();
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
      alert("Pehle plan generate karo 🚀");
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
        alert(data.message || "Save failed ❌");
        return;
      }

      alert("Trip added successfully ✅");

      setDestination("");
      setDate("");
      setBudget("");
      setPlan(null);

      getTrips();

    } catch (err) {
      console.log("ERROR:", err.message);
      alert(err.message);
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

  // ================= EDIT CLICK =================
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

  // ================= UI =================
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-xl">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Travel Planner ✈️</h1>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {/* SEARCH */}
        <input
          placeholder="Search..."
          className="border p-2 w-full mb-3 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* FORM */}
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

        {/* WEATHER */}
        <WeatherBox weather={weather} />

        {/* PLAN */}
        <PlanDisplay plan={plan} />

        {/* MAP */}
        <MapBox destination={destination} />

        {/* TRIPS */}
        <TripList
          trips={trips}
          search={search}
          onEdit={handleEdit}
          onDelete={deleteTrip}
        />

      </div>
    </div>
  );
}

export default MainApp;