import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

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
  try {
    return JSON.parse(localStorage.getItem("travelUser") || "{}");
  } catch {
    return {};
  }
}

function isAuthenticated() {
  const token = localStorage.getItem("travelToken");
  const user = getStoredUser();
  return !!(token && user?.id);
}

function isAdminUser() {
  return getStoredUser()?.isAdmin === true;
}

// ── Route Guards ─────────────────────────────────────────────────────────
function ProtectedRoute({ children, isLoggedIn }) {
  return isLoggedIn ? children : <Navigate to="/" replace />;
}

function AdminRoute({ children, isLoggedIn }) {
  if (!isLoggedIn) return <Navigate to="/" replace />;
  if (!isAdminUser()) return <Navigate to="/home" replace />;
  return children;
}

// ── Premium Layout Wrapper ───────────────────────────────────────────────
function Layout({
  children,
  handleLogout,
  theme,
  setTheme,
}) {
  return (
    <>
      <Navbar
        setIsLoggedIn={handleLogout}
        theme={theme}
        setTheme={setTheme}
      />

      <div
        className="
          min-h-screen
          bg-gradient-to-br
          from-slate-50
          via-white
          to-cyan-50
          dark:from-slate-950
          dark:via-slate-900
          dark:to-slate-950
          transition-colors
          duration-500
        "
      >
        {children}
      </div>
    </>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] =
    useState(isAuthenticated);

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  // ── Theme Controller ──────────────────────────────────────────────────
  useEffect(() => {
    document.documentElement.style.scrollBehavior =
      "smooth";

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  // ── Logout ────────────────────────────────────────────────────────────
  const handleLogout = () => {
    localStorage.removeItem("travelToken");
    localStorage.removeItem("travelUser");
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <Routes>

        {/* Login / Register */}
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/home" replace />
            ) : (
              <AuthPage
                setIsLoggedIn={setIsLoggedIn}
              />
            )
          }
        />

        {/* Admin */}
        <Route
          path="/admin/*"
          element={
            <AdminRoute
              isLoggedIn={isLoggedIn}
            >
              <AdminPanel
                onLogout={handleLogout}
              />
            </AdminRoute>
          }
        />

        {/* Home */}
        <Route
          path="/home"
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
            >
              <Layout
                handleLogout={handleLogout}
                theme={theme}
                setTheme={setTheme}
              >
                <Home />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Destinations */}
        <Route
          path="/destinations"
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
            >
              <Layout
                handleLogout={handleLogout}
                theme={theme}
                setTheme={setTheme}
              >
                <Destinations />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* My Trips */}
        <Route
          path="/my-trips"
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
            >
              <Layout
                handleLogout={handleLogout}
                theme={theme}
                setTheme={setTheme}
              >
                <MyTrips />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* About */}
        <Route
          path="/about"
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
            >
              <Layout
                handleLogout={handleLogout}
                theme={theme}
                setTheme={setTheme}
              >
                <About />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Help */}
        <Route
          path="/help"
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
            >
              <Layout
                handleLogout={handleLogout}
                theme={theme}
                setTheme={setTheme}
              >
                <Help />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Contact */}
        <Route
          path="/contact"
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
            >
              <Layout
                handleLogout={handleLogout}
                theme={theme}
                setTheme={setTheme}
              >
                <Contact />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Map Explore */}
        <Route
          path="/map"
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
            >
              <Layout
                handleLogout={handleLogout}
                theme={theme}
                setTheme={setTheme}
              >
                <MapExplore />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route
          path="*"
          element={
            <Navigate
              to={
                isLoggedIn
                  ? "/home"
                  : "/"
              }
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;