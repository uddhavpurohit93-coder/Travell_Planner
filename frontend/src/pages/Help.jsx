import { useState } from "react";

function Help() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [search, setSearch] = useState("");

  const faqs = [
    { q: "How do I create a new trip?", a: "Go to Home page → Fill form → Generate Plan → Save Trip." },
    { q: "How does AI Trip Planning work?", a: "AI creates itinerary, hotels, food, and budget automatically." },
    { q: "Can I edit or delete my trips?", a: "Yes, go to My Trips section and edit or delete." },
    { q: "How is the budget divided?", a: "50% Hotel, 30% Food, 20% Travel." },
    { q: "How does Live Weather work?", a: "We use OpenWeather API for real-time weather data." },
    { q: "What is Map feature?", a: "Interactive map shows destination using Leaflet." },
    { q: "Is my data safe?", a: "Yes, secured with JWT authentication + MongoDB." },
    { q: "How do I logout?", a: "Click logout button in navbar." },
  ];

  const guides = [
    {
      icon: "✈️",
      title: "Plan Trip",
      steps: ["Enter details", "Generate plan", "Save trip"],
    },
    {
      icon: "✏️",
      title: "Edit Trip",
      steps: ["Go My Trips", "Click Edit", "Update & save"],
    },
    {
      icon: "🗺️",
      title: "Explore",
      steps: ["Open Destinations", "Select place", "Start planning"],
    },
  ];

  const filteredFaqs = faqs.filter((f) =>
    f.q.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors">

      {/* HERO */}
      <div className="relative h-[320px] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600')",
        }}
      >
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-6xl font-black text-white">
            Help Center 🆘
          </h1>
          <p className="text-white/80 mt-3 max-w-xl">
            Search answers and solve your problems instantly
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">

        {/* SEARCH */}
        <div className="-mt-20 relative z-10">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search your question..."
            className="
              w-full p-5 rounded-3xl
              bg-white dark:bg-slate-900
              border border-slate-200 dark:border-slate-800
              shadow-xl outline-none
              text-lg
            "
          />
        </div>

        {/* QUICK LINKS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["Getting Started", "Edit Trips", "Budget Help", "Login"].map((t) => (
            <button
              key={t}
              onClick={() => setSearch(t)}
              className="
                p-5 rounded-2xl text-center
                bg-white dark:bg-slate-900
                border border-slate-200 dark:border-slate-800
                hover:-translate-y-1 transition-all
              "
            >
              <p className="font-bold text-sm">{t}</p>
            </button>
          ))}
        </div>

        {/* GUIDES */}
        <div>
          <h2 className="text-3xl font-black mb-6">Step Guides 📖</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {guides.map((g) => (
              <div
                key={g.title}
                className="
                  p-6 rounded-3xl
                  bg-white dark:bg-slate-900
                  border border-slate-200 dark:border-slate-800
                  hover:-translate-y-1 transition-all
                "
              >
                <div className="text-4xl">{g.icon}</div>
                <h3 className="font-black mt-3">{g.title}</h3>

                <ul className="mt-4 space-y-2 text-sm text-slate-500 dark:text-slate-400">
                  {g.steps.map((s, i) => (
                    <li key={i}>• {s}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-3xl font-black mb-6">FAQs ❓</h2>

          <div className="space-y-3">
            {filteredFaqs.map((f, i) => (
              <div
                key={i}
                className="
                  rounded-2xl overflow-hidden
                  bg-white dark:bg-slate-900
                  border border-slate-200 dark:border-slate-800
                "
              >
                <button
                  onClick={() =>
                    setActiveIndex(activeIndex === i ? null : i)
                  }
                  className="w-full p-5 flex justify-between"
                >
                  <span className="font-semibold">{f.q}</span>
                  <span>{activeIndex === i ? "▲" : "▼"}</span>
                </button>

                {activeIndex === i && (
                  <div className="p-5 text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="
          text-center p-8 rounded-3xl
          bg-gradient-to-r from-cyan-50 to-blue-50
          dark:from-slate-900 dark:to-slate-900
          border border-slate-200 dark:border-slate-800
        ">
          <h2 className="text-2xl font-black">
            Still Need Help? 🤝
          </h2>

          <p className="text-slate-500 mt-2">
            Contact our support team anytime
          </p>

          <div className="flex gap-4 justify-center mt-6">
            <button
              onClick={() => (window.location.href = "/contact")}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold"
            >
              Contact
            </button>

            <button
              onClick={() => (window.location.href = "/")}
              className="px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-700"
            >
              Home
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Help;