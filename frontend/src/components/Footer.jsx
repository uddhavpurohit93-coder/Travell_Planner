function Footer() {
  return (
    <footer className="mt-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 pb-10">
        <div className="
          relative overflow-hidden
          rounded-[32px]
          border border-slate-200
          bg-gradient-to-br from-white via-cyan-50 to-blue-50
          shadow-[0_25px_70px_rgba(15,23,42,0.12)]
          px-8 py-10
        ">
          {/* soft glow */}
          <div className="absolute -top-20 -left-20 w-56 h-56 bg-cyan-300/25 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-300/25 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              
              {/* Brand */}
              <div className="text-center lg:text-left">
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-wide">
                  Roamify ✈️
                </h2>

                <p className="mt-3 text-slate-500 max-w-md leading-relaxed">
                  Your smart AI travel planner for beautiful journeys,
                  hidden gems and unforgettable experiences.
                </p>
              </div>

              {/* Links */}
              <div className="flex flex-wrap justify-center gap-3">
                <span className="
                  px-5 py-2 rounded-full
                  bg-white border border-slate-200
                  text-slate-600 text-sm font-semibold
                  shadow-sm hover:shadow-md
                  hover:-translate-y-1 hover:text-cyan-500
                  transition-all cursor-pointer
                ">
                  Home
                </span>

                <span className="
                  px-5 py-2 rounded-full
                  bg-white border border-slate-200
                  text-slate-600 text-sm font-semibold
                  shadow-sm hover:shadow-md
                  hover:-translate-y-1 hover:text-cyan-500
                  transition-all cursor-pointer
                ">
                  Destinations
                </span>

                <span className="
                  px-5 py-2 rounded-full
                  bg-white border border-slate-200
                  text-slate-600 text-sm font-semibold
                  shadow-sm hover:shadow-md
                  hover:-translate-y-1 hover:text-cyan-500
                  transition-all cursor-pointer
                ">
                  My Trips
                </span>

                <span className="
                  px-5 py-2 rounded-full
                  bg-white border border-slate-200
                  text-slate-600 text-sm font-semibold
                  shadow-sm hover:shadow-md
                  hover:-translate-y-1 hover:text-cyan-500
                  transition-all cursor-pointer
                ">
                  Contact
                </span>
              </div>
            </div>

            {/* Bottom */}
            <div className="
              mt-8 pt-6
              border-t border-slate-200
              flex flex-col md:flex-row
              items-center justify-between gap-4
            ">
              <p className="text-slate-400 text-sm">
                © 2024 Roamify. All rights reserved.
              </p>

              <div className="flex gap-4 text-sm text-slate-400">
                <span className="hover:text-cyan-500 cursor-pointer transition-colors">
                  Privacy
                </span>
                <span className="hover:text-cyan-500 cursor-pointer transition-colors">
                  Terms
                </span>
                <span className="hover:text-cyan-500 cursor-pointer transition-colors">
                  Support
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;