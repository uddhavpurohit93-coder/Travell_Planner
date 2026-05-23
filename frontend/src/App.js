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
import AdminPanel from "./pages/AdminPanel";
import MapExplore from "./pages/MapExplore";

// ── Helpers ──────────────────────────────────────────────────────────────
function getStoredUser() {
  try { return JSON.parse(localStorage.getItem("travelUser") || "{}"); } 
  catch { return {}; }
}

function isAuthenticated() {
  const token = localStorage.getItem("travelToken");
  const user = getStoredUser();
  return !!(token && user?.id);
}

function isAdminUser() {
  return getStoredUser()?.isAdmin === true;
}

// ── Route guards ─────────────────────────────────────────────────────────
function ProtectedRoute({ children, isLoggedIn }) {
  return isLoggedIn ? children : <Navigate to="/" replace />;
}

function AdminRoute({ children, isLoggedIn }) {
  if (!isLoggedIn) return <Navigate to="/" replace />;
  if (!isAdminUser()) return <Navigate to="/home" replace />;
  return children;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated);

  const handleLogout = () => {
    localStorage.removeItem("travelToken");
    localStorage.removeItem("travelUser");
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth screen */}
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/home" replace />
            ) : (
              <AuthPage setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />

        {/* Admin panel — no Navbar, completely isolated */}
        <Route
          path="/admin/*"
          element={
            <AdminRoute isLoggedIn={isLoggedIn}>
              <AdminPanel onLogout={handleLogout} />
            </AdminRoute>
          }
        />

        {/* Protected user pages */}
        {[
          { path: "/home", Component: Home },
          { path: "/destinations", Component: Destinations },
          { path: "/my-trips", Component: MyTrips },
          { path: "/about", Component: About },
          { path: "/help", Component: Help },
          { path: "/contact", Component: Contact },
        ].map(({ path, Component }) => (
          <Route
            key={path}
            path={path}
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Navbar setIsLoggedIn={handleLogout} />
                <Component />
              </ProtectedRoute>
            }
          />
        ))}

        {/* Map explore page */}
        <Route
          path="/map"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <MapExplore />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to={isLoggedIn ? "/home" : "/"} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
