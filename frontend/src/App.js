import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import AuthPage from "./AuthPage";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import MyTrips from "./pages/MyTrips";
import About from "./pages/About";
import Help from "./pages/Help";
import Contact from "./pages/Contact";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("travelUser") === "true"
  );

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth screen */}
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/home" />
            ) : (
              <AuthPage setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />

        {/* Protected pages with Navbar */}
        <Route
          path="/home"
          element={
            isLoggedIn ? (
              <>
                <Navbar setIsLoggedIn={setIsLoggedIn} />
                <Home />
              </>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/destinations"
          element={
            isLoggedIn ? (
              <>
                <Navbar setIsLoggedIn={setIsLoggedIn} />
                <Destinations />
              </>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/my-trips"
          element={
            isLoggedIn ? (
              <>
                <Navbar setIsLoggedIn={setIsLoggedIn} />
                <MyTrips />
              </>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/about"
          element={
            isLoggedIn ? (
              <>
                <Navbar setIsLoggedIn={setIsLoggedIn} />
                <About />
              </>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/help"
          element={
            isLoggedIn ? (
              <>
                <Navbar setIsLoggedIn={setIsLoggedIn} />
                <Help />
              </>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/contact"
          element={
            isLoggedIn ? (
              <>
                <Navbar setIsLoggedIn={setIsLoggedIn} />
                <Contact />
              </>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Wrong route fallback */}
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/home" : "/"} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;