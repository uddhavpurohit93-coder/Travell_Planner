
const places = [

  {
    name: "Goa",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200&auto=format&fit=crop",
    rating: "4.8",
    budget: "₹15,000",
    description: "Beaches, nightlife & sunsets"
  },

  {
    name: "Manali",
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200&auto=format&fit=crop",
    rating: "4.7",
    budget: "₹12,000",
    description: "Snow mountains & adventure"
  },

  {
    name: "Udaipur",
    image:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1200&auto=format&fit=crop",
    rating: "4.9",
    budget: "₹18,000",
    description: "Royal palaces & lakes"
  }

];

function TrendingDestinations({ setDestination }) {


  return (

    <div>

      {/* TITLE */}
      <div className="flex justify-between items-center mb-8">

        <div>

          <h2 className="text-4xl font-bold">
            Trending Destinations 🌍
          </h2>

          <p className="text-gray-300 mt-2">
            Discover the most loved travel spots
          </p>

        </div>

        <button
          onClick={() => {
            window.scrollTo({
              top: 900,
              behavior: "smooth"
            });
          }}
          className="px-5 py-3 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/20 transition"
        >
          View All
        </button>

      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

        {places.map((place, index) => (

          <div
            key={index}
            className="group relative rounded-[30px] overflow-hidden shadow-2xl border border-white/10 hover:-translate-y-2 transition-all duration-500"
          >

            {/* IMAGE */}
            <div className="overflow-hidden">

              <img
                src={place.image}
                alt={place.name}
                className="w-full h-[420px] object-cover group-hover:scale-110 transition duration-700"
              />

            </div>

            {/* DARK OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

            {/* CONTENT */}
            <div className="absolute bottom-0 left-0 w-full p-6">

              {/* TOP */}
              <div className="flex justify-between items-start">

                <div>

                  <h2 className="text-3xl font-bold text-white">
                    {place.name}
                  </h2>

                  <p className="text-gray-200 mt-2">
                    {place.description}
                  </p>

                </div>

                <div className="bg-white/20 backdrop-blur-lg px-3 py-2 rounded-2xl text-sm text-white border border-white/20">

                  ⭐ {place.rating}

                </div>

              </div>

              {/* BOTTOM */}
              <div className="flex justify-between items-center mt-6">

                <div>

                  <p className="text-gray-300 text-sm">
                    Starting From
                  </p>

                  <h3 className="text-2xl font-bold text-green-300">
                    {place.budget}
                  </h3>

                </div>

                <button
                  onClick={() => {
                    setDestination(place.name);

                    window.scrollTo({
                      top: 300,
                      behavior: "smooth"
                    });
                  }}
                  className="mt-5 w-full py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:scale-[1.02] transition font-semibold"
                >
                  Explore ✈️
                </button>

              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default TrendingDestinations;