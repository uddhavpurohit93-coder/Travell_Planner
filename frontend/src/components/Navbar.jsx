import { NavLink, useNavigate } from "react-router-dom";

function Navbar({ setIsLoggedIn, theme, setTheme }) {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("travelUser") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("travelUser");
    localStorage.removeItem("travelToken");
    setIsLoggedIn(false);
    navigate("/");
  };

  const navLinks = [
    { name: "Home", path: "/home" },
    { name: "Destinations", path: "/destinations" },
    { name: "My Trips", path: "/my-trips" },
    { name: "About", path: "/about" },
    { name: "Help", path: "/help" },
    { name: "Contact", path: "/contact" },
  ];

  const handleStartPlanning = () => {
    if (window.location.pathname !== "/home") {
      navigate("/home");

      setTimeout(() => {
        document
          .getElementById("trip-form")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 800);
    } else {
      document
        .getElementById("trip-form")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-700 shadow-sm transition-colors duration-300">
      <div className="max-w-full mx-auto px-8 py-4 flex items-center justify-between">
        {/* LOGO */}
        <div
          onClick={() => navigate("/home")}
          className="cursor-pointer"
        >
          <h1 className="text-3xl font-black tracking-wide text-slate-900 dark:text-white">
            Roamify
          </h1>

          <p className="text-[11px] tracking-[0.45em] text-cyan-500 font-bold mt-1">
            YOUR PATH TO DISCOVERY
          </p>
        </div>

        {/* LINKS */}
        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `px-4 py-2 rounded-xl text-[15px] font-bold transition-all ${
                  isActive
                    ? "text-white bg-cyan-500 shadow-md"
                    : "text-slate-600 dark:text-slate-300 hover:text-cyan-600 hover:bg-cyan-50 dark:hover:bg-slate-800"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* RIGHT BUTTONS */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={() =>
              setTheme(theme === "light" ? "dark" : "light")
            }
            className="px-4 py-3 rounded-xl font-bold border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            title="Toggle Theme"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          {/* Admin Panel */}
          {user?.isAdmin === true && (
            <button
              onClick={() => navigate("/admin")}
              className="px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 transition-all shadow-md"
            >
              ⚙️ Admin Panel
            </button>
          )}

          {/* Start Planning */}
          <button
            onClick={handleStartPlanning}
            className="px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 transition-all shadow-md"
          >
            Start Planning
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-400 hover:to-red-400 transition-all shadow-md"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;