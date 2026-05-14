import {
  Compass,
  Menu,
  X
} from "lucide-react";

import {
  useNavigate
} from "react-router-dom";

import {
  useState
} from "react";

function Navbar() {

  const navigate =
    useNavigate();

  const [mobileMenu,
    setMobileMenu] =
    useState(false);

  return (

    <nav className="
      fixed top-0 left-0
      w-full z-50
      border-b border-white/10
      bg-[#071120]/80
      backdrop-blur-2xl
    ">

      <div className="
        max-w-7xl mx-auto
        px-6 py-5
        flex items-center
        justify-between
      ">

        {/* LOGO */}

        <div
          onClick={() => navigate("/")}
          className="
            flex items-center gap-3
            cursor-pointer
          "
        >

          <div className="
            w-14 h-14
            rounded-2xl
            bg-gradient-to-br
            from-cyan-400
            to-blue-500
            flex items-center justify-center
            shadow-lg shadow-cyan-500/30
          ">

            <Compass size={26} />

          </div>

          <div>

            <h2 className="
              text-3xl font-bold
              text-white
            ">

              Travel AI

            </h2>

            <p className="
              text-sm text-gray-400
            ">

              Luxury Travel Planner

            </p>

          </div>

        </div>

        {/* DESKTOP MENU */}

        <div className="
          hidden lg:flex
          items-center gap-10
          text-gray-300
          font-medium
        ">

          <button
            onClick={() => navigate("/")}
            className="
              hover:text-cyan-400
              transition-all
            "
          >

            Home

          </button>

          <button
            onClick={() => navigate("/destinations")}
            className="
              hover:text-cyan-400
              transition-all
            "
          >

            Destinations

          </button>

          <button
            onClick={() => navigate("/my-trips")}
            className="
              hover:text-cyan-400
              transition-all
            "
          >

            My Trips

          </button>

          <button
            onClick={() => navigate("/contact")}
            className="
              hover:text-cyan-400
              transition-all
            "
          >

            Contact

          </button>

        </div>

        {/* RIGHT SIDE */}

        <div className="
          flex items-center gap-4
        ">

          {/* LOGIN */}

          <button
            onClick={() => navigate("/login")}
            className="
              hidden md:block
              px-6 py-3
              rounded-2xl
              bg-white/5
              border border-white/10
              hover:bg-white/10
              hover:border-cyan-400/20
              text-white
              transition-all
            "
          >

            Login

          </button>

          {/* SIGNUP */}

          <button
            onClick={() => navigate("/signup")}
            className="
              hidden md:block
              px-6 py-3
              rounded-2xl
              bg-gradient-to-r
              from-cyan-500
              to-blue-500
              font-semibold
              text-white
              hover:scale-105
              transition-all duration-300
            "
          >

            Start Planning

          </button>

          {/* MOBILE BUTTON */}

          <button
            onClick={() =>
              setMobileMenu(!mobileMenu)
            }
            className="
              lg:hidden
              w-12 h-12
              rounded-2xl
              bg-white/5
              border border-white/10
              flex items-center justify-center
              text-white
            "
          >

            {mobileMenu
              ? <X size={24} />
              : <Menu size={24} />
            }

          </button>

        </div>

      </div>

      {/* MOBILE MENU */}

      {mobileMenu && (

        <div className="
          lg:hidden
          px-6 pb-6
          bg-[#071120]
          border-t border-white/10
        ">

          <div className="
            flex flex-col gap-5
            text-white mt-6
          ">

            <button
              onClick={() => navigate("/")}
              className="
                text-left
                hover:text-cyan-400
              "
            >

              Home

            </button>

            <button
              onClick={() => navigate("/destinations")}
              className="
                text-left
                hover:text-cyan-400
              "
            >

              Destinations

            </button>

            <button
              onClick={() => navigate("/my-trips")}
              className="
                text-left
                hover:text-cyan-400
              "
            >

              My Trips

            </button>

            <button
              onClick={() => navigate("/contact")}
              className="
                text-left
                hover:text-cyan-400
              "
            >

              Contact

            </button>

            <button
              onClick={() => navigate("/login")}
              className="
                mt-4
                px-6 py-3
                rounded-2xl
                bg-white/5
                border border-white/10
              "
            >

              Login

            </button>

            <button
              onClick={() => navigate("/signup")}
              className="
                px-6 py-3
                rounded-2xl
                bg-gradient-to-r
                from-cyan-500
                to-blue-500
                font-semibold
              "
            >

              Start Planning

            </button>

          </div>

        </div>

      )}

    </nav>
  );
}

export default Navbar;