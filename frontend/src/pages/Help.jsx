import { useState } from "react";

function Help() {

  const [activeIndex, setActiveIndex] = useState(null);
  const [search, setSearch] = useState("");

  const faqs = [
    {
      q: "How do I create a new trip?",
      a: "Go to Home page → Fill Destination, Date, Budget, Days → Click 'Generate Plan' → Then click 'Save Trip' to save it."
    },
    {
      q: "How does AI Trip Planning work?",
      a: "Our AI analyzes your destination, budget, and number of days to automatically create a personalized day-by-day itinerary with places, hotels, and budget breakdown."
    },
    {
      q: "Can I edit or delete my trips?",
      a: "Yes! Go to My Trips section → Click Edit to modify any trip or Delete to remove it permanently."
    },
    {
      q: "How is the budget divided?",
      a: "Budget is automatically split as: 50% Hotel, 30% Food, 20% Travel. This gives you a realistic cost estimate."
    },
    {
      q: "How does Live Weather work?",
      a: "When you enter a destination, we fetch real-time weather data using OpenWeather API to show current temperature and conditions."
    },
    {
      q: "What is the Map feature?",
      a: "The interactive map shows your destination location using Leaflet Maps so you can explore the area visually before visiting."
    },
    {
      q: "Is my data safe?",
      a: "Yes! We use JWT authentication and encrypted passwords. Your trip data is stored securely in MongoDB database."
    },
    {
      q: "How do I logout?",
      a: "Click the Logout button in the top right corner of the Navbar. This will clear your session and redirect to login page."
    }
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
        "Save your Trip"
      ]
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
        "Click Update Trip"
      ]
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
        "Start planning!"
      ]
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.q.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#071120] 
                    via-[#0a1b3d] to-[#09152a] text-white">

      {/* HERO */}
      <div className="relative h-[250px] bg-cover bg-center"
           style={{
             backgroundImage: "url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1600&q=80')"
           }}>
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex flex-col items-center 
                        justify-center h-full text-center px-4">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 
                         to-cyan-400 bg-clip-text text-transparent">
            Help Center 🆘
          </h1>
          <p className="text-gray-300 mt-3 text-lg">
            Find answers to all your questions
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-12">

        {/* SEARCH */}
        <div className="relative mb-10">
          <span className="absolute left-4 top-4 text-gray-400 text-xl">
            🔍
          </span>
          <input
            placeholder="Search your question..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/10 border border-white/10
                       rounded-2xl pl-12 pr-4 py-4 outline-none
                       focus:border-blue-500 transition-all text-lg
                       placeholder-gray-500"
          />
        </div>

        {/* QUICK LINKS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: "🚀", label: "Getting Started" },
            { icon: "✏️", label: "Edit Trips" },
            { icon: "💰", label: "Budget Help" },
            { icon: "🔒", label: "Account & Login" }
          ].map((item, i) => (
            <button key={i}
                    onClick={() => setSearch(item.label)}
                    className="bg-white/10 hover:bg-blue-500/20 
                               border border-white/10 hover:border-blue-500/50
                               rounded-2xl p-4 text-center
                               transition-all hover:scale-105">
              <span className="text-3xl">{item.icon}</span>
              <p className="text-sm font-medium mt-2">{item.label}</p>
            </button>
          ))}
        </div>

        {/* HOW TO USE GUIDES */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">
            Step-by-Step Guides 📖
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {guides.map((guide, i) => (
              <div key={i}
                   className="bg-white/10 backdrop-blur-lg rounded-3xl p-6
                              border border-white/10 hover:border-blue-500/50
                              transition-all duration-300">
                <span className="text-4xl">{guide.icon}</span>
                <h3 className="text-xl font-bold mt-3 mb-4">
                  {guide.title}
                </h3>
                <div className="space-y-2">
                  {guide.steps.map((step, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <span className="bg-blue-500 text-white w-6 h-6 
                                       rounded-full text-xs flex items-center 
                                       justify-center font-bold flex-shrink-0">
                        {j + 1}
                      </span>
                      <p className="text-gray-300 text-sm">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ ACCORDION */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">
            Frequently Asked Questions ❓
          </h2>

          {filteredFaqs.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              <span className="text-5xl">🔍</span>
              <p className="mt-3">No results found for "{search}"</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredFaqs.map((faq, i) => (
                <div key={i}
                     className="bg-white/10 backdrop-blur-lg rounded-2xl
                                border border-white/10 overflow-hidden
                                hover:border-blue-500/30 transition-all">

                  {/* QUESTION */}
                  <button
                    onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                    className="w-full flex justify-between items-center 
                               p-5 text-left">
                    <span className="font-semibold text-lg">
                      {faq.q}
                    </span>
                    <span className={`text-blue-400 text-xl transition-transform
                                     duration-300 ${activeIndex === i ? "rotate-180" : ""}`}>
                      ▼
                    </span>
                  </button>

                  {/* ANSWER */}
                  {activeIndex === i && (
                    <div className="px-5 pb-5 text-gray-300 border-t 
                                    border-white/10 pt-4">
                      {faq.a}
                    </div>
                  )}

                </div>
              ))}
            </div>
          )}
        </div>

        {/* STILL NEED HELP */}
        <div className="bg-gradient-to-r from-blue-600/30 to-cyan-600/30
                        rounded-3xl p-8 text-center border border-blue-500/20">
          <h2 className="text-2xl font-bold">Still Need Help? 🤝</h2>
          <p className="text-gray-400 mt-2">
            Our support team is always ready to help you
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => window.location.href = "/contact"}
              className="bg-blue-500 hover:bg-blue-600 px-6 py-3 
                         rounded-xl font-bold transition-all
                         hover:shadow-lg hover:shadow-blue-500/30">
              📧 Contact Us
            </button>
            <button
              onClick={() => window.location.href = "/"}
              className="bg-white/10 hover:bg-white/20 px-6 py-3 
                         rounded-xl font-bold transition-all">
              🏠 Go Home
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Help;