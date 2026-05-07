import { Link, useLocation } from "react-router-dom";

function Navbar() {

  const location = useLocation();

  const navItem = (path, label) => (

    <Link
      to={path}
      className={`px-5 py-2 rounded-xl transition font-medium ${
        location.pathname === path
          ? "bg-blue-500 text-white"
          : "text-gray-300 hover:bg-white/10 hover:text-white"
      }`}
    >
      {label}
    </Link>
  );

  return (

    <div className="sticky top-0 z-50 backdrop-blur-xl bg-[#071120]/80 border-b border-white/10">

      <div className="max-w-[1800px] mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link
          to="/"
          className="text-3xl font-bold"
        >
          Travel AI ✈️
        </Link>

        {/* NAV LINKS */}
        <div className="hidden md:flex items-center gap-3">

          {navItem("/", "Home")}

          {navItem("/destinations", "Destinations")}

          {navItem("/my-trips", "My Trips")}

          {navItem("/about", "About")}

          {navItem("/help", "Help")}

          {navItem("/contact", "Contact")}

        </div>

      </div>

    </div>
  );
}

export default Navbar;