import { useState } from "react";

function Help() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [search, setSearch] = useState("");

  const faqs = [
    {
      q: "How do I create a new trip?",
      a: "Go to Home page → Fill Destination, Date, Budget, Days → Click 'Generate Plan' → Then click 'Save Trip' to save it.",
    },
    {
      q: "How does AI Trip Planning work?",
      a: "Our AI analyzes your destination, budget, and number of days to automatically create a personalized day-by-day itinerary with places, hotels, and budget breakdown.",
    },
    {
      q: "Can I edit or delete my trips?",
      a: "Yes! Go to My Trips section → Click Edit to modify any trip or Delete to remove it permanently.",
    },
    {
      q: "How is the budget divided?",
      a: "Budget is automatically split as: 50% Hotel, 30% Food, 20% Travel. This gives you a realistic cost estimate.",
    },
    {
      q: "How does Live Weather work?",
      a: "When you enter a destination, we fetch real-time weather data using OpenWeather API to show current temperature and conditions.",
    },
    {
      q: "What is the Map feature?",
      a: "The interactive map shows your destination location using Leaflet Maps so you can explore the area visually before visiting.",
    },
    {
      q: "Is my data safe?",
      a: "Yes! We use JWT authentication and encrypted passwords. Your trip data is stored securely in MongoDB database.",
    },
    {
      q: "How do I logout?",
      a: "Click the Logout button in the top right corner of the Navbar. This will clear your session and redirect to login page.",
    },
  ];

  const guides = [
    {
      icon: "✈️",
      title: "Plan Your First Trip",
      steps: [
        "Enter your Destination",
        "Select Travel Date",
        "Set your Budget (₹)",
        "Enter number of Days",
        "Click Generate Plan",
        "Save your Trip",
      ],
    },
    {
      icon: "✏️",
      title: "Edit a Trip",
      steps: [
        "Go to My Trips section",
        "Find the trip to edit",
        "Click Edit button",
        "Update the details",
        "Generate new plan",
        "Click Update Trip",
      ],
    },
    {
      icon: "🗺️",
      title: "Explore Destinations",
      steps: [
        "Click Destinations in Navbar",
        "Browse all destinations",
        "Click any destination card",
        "View details & highlights",
        "Click Plan Trip Here",
        "Start planning!",
      ],
    },
  ];

  const filteredFaqs = faqs.filter((faq) =>
    faq.q.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* HERO WITH IMAGE */}
      <div
        className="relative h-[320px] bg-cover bg-center border-b border-slate-200"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/65 to-cyan-950/60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.22),transparent_35%)]" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-cyan-100 px-5 py-2 rounded-full font-bold text-sm mb-5 backdrop-blur-md">
            🆘 Support Center
          </div>

          <h1 className="text-6xl md:text-7xl font-black text-white drop-shadow-lg">
            Help Center
          </h1>

          <p className="text-slate-200 mt-4 text-lg max-w-2xl">
            Search answers, follow step-by-step guides, and solve your travel
            planning issues quickly.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-12">
        {/* SEARCH */}
        <div className="relative mb-10 -mt-24 z-20">
          <span className="absolute left-5 top-5 text-slate-400 text-xl">
            🔍
          </span>

          <input
            placeholder="Search your question..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-slate-200
                       rounded-3xl pl-14 pr-5 py-5 outline-none
                       focus:border-blue-500 transition-all text-lg
                       placeholder-slate-400 text-slate-900
                       shadow-[0_18px_45px_rgba(15,23,42,0.16)]
                       focus:shadow-[0_20px_50px_rgba(59,130,246,0.22)]"
          />
        </div>

        {/* QUICK LINKS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 relative z-20">
          {[
            { icon: "🚀", label: "Getting Started" },
            { icon: "✏️", label: "Edit Trips" },
            { icon: "💰", label: "Budget Help" },
            { icon: "🔒", label: "Account & Login" },
          ].map((item, i) => (
            <button
              key={i}
              onClick={() => setSearch(item.label)}
              className="bg-white
                         hover:bg-gradient-to-br hover:from-blue-50 hover:to-cyan-50
                         border border-slate-200 hover:border-blue-400
                         rounded-3xl p-5 text-center
                         shadow-[0_14px_35px_rgba(15,23,42,0.12)]
                         transition-all hover:scale-105 hover:-translate-y-1
                         hover:shadow-[0_18px_45px_rgba(59,130,246,0.20)]"
            >
              <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center text-3xl shadow-inner">
                {item.icon}
              </div>

              <p className="text-sm font-bold mt-3 text-slate-700">
                {item.label}
              </p>
            </button>
          ))}
        </div>

        {/* HOW TO USE GUIDES */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-slate-900">
            Step-by-Step Guides 📖
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {guides.map((guide, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-white to-slate-50 rounded-3xl p-6
                           border border-slate-200 hover:border-blue-400
                           shadow-[0_14px_40px_rgba(15,23,42,0.12)]
                           hover:shadow-[0_20px_50px_rgba(59,130,246,0.18)]
                           transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center text-4xl shadow-inner">
                  {guide.icon}
                </div>

                <h3 className="text-xl font-bold mt-4 mb-4 text-slate-900">
                  {guide.title}
                </h3>

                <div className="space-y-2">
                  {guide.steps.map((step, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <span
                        className="bg-blue-500 text-white w-6 h-6 
                                   rounded-full text-xs flex items-center 
                                   justify-center font-bold flex-shrink-0"
                      >
                        {j + 1}
                      </span>

                      <p className="text-slate-600 text-sm">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ ACCORDION */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-slate-900">
            Frequently Asked Questions ❓
          </h2>

          {filteredFaqs.length === 0 ? (
            <div className="text-center py-10 text-slate-500 bg-white rounded-3xl border border-slate-200 shadow-[0_14px_40px_rgba(15,23,42,0.10)]">
              <span className="text-5xl">🔍</span>
              <p className="mt-3">No results found for "{search}"</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredFaqs.map((faq, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl
                             border border-slate-200 overflow-hidden
                             shadow-[0_10px_28px_rgba(15,23,42,0.08)]
                             hover:shadow-[0_16px_40px_rgba(59,130,246,0.16)]
                             hover:border-blue-300 transition-all"
                >
                  {/* QUESTION */}
                  <button
                    onClick={() =>
                      setActiveIndex(activeIndex === i ? null : i)
                    }
                    className="w-full flex justify-between items-center 
                               p-5 text-left"
                  >
                    <span className="font-semibold text-lg text-slate-900">
                      {faq.q}
                    </span>

                    <span
                      className={`text-blue-500 text-xl transition-transform
                                  duration-300 ${
                                    activeIndex === i ? "rotate-180" : ""
                                  }`}
                    >
                      ▼
                    </span>
                  </button>

                  {/* ANSWER */}
                  {activeIndex === i && (
                    <div
                      className="px-5 pb-5 text-slate-600 border-t 
                                 border-slate-100 pt-4 bg-slate-50"
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* STILL NEED HELP */}
        <div
          className="bg-gradient-to-r from-blue-50 to-cyan-50
                     rounded-3xl p-8 text-center border border-blue-100
                     shadow-[0_16px_45px_rgba(14,165,233,0.18)]"
        >
          <h2 className="text-2xl font-bold text-slate-900">
            Still Need Help? 🤝
          </h2>

          <p className="text-slate-500 mt-2">
            Our support team is always ready to help you
          </p>

          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => (window.location.href = "/contact")}
              className="bg-gradient-to-r from-cyan-500 to-blue-500
                         hover:from-cyan-600 hover:to-blue-600
                         px-6 py-3 rounded-xl font-bold transition-all
                         text-white hover:scale-105
                         shadow-[0_12px_28px_rgba(59,130,246,0.28)]"
            >
              📧 Contact Us
            </button>

            <button
              onClick={() => (window.location.href = "/")}
              className="bg-white hover:bg-slate-50 px-6 py-3 
                         rounded-xl font-bold transition-all text-slate-700
                         border border-slate-200 hover:scale-105
                         shadow-[0_8px_22px_rgba(15,23,42,0.08)]"
            >
              🏠 Go Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Help;