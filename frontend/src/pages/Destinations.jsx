import { useState } from "react";

const destinationsList = [
  {
    name: "Goa",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=500",
    rating: 4.8,
    price: 12000,
    desc: "Beaches & Nightlife",
    best: "Nov - Feb",
    highlight: "Baga Beach, Dudhsagar Falls"
  },
  {
    name: "Manali",
    image: "https://cdn.pixabay.com/photo/2018/01/19/13/56/mountain-3092438_960_720.jpg",
    rating: 4.9,
    price: 15000,
    desc: "Snow Mountains",
    best: "Dec - Feb",
    highlight: "Rohtang Pass, Solang Valley"
  },
  {
    name: "Jaipur",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=500",
    rating: 4.7,
    price: 10000,
    desc: "Royal Heritage",
    best: "Oct - Mar",
    highlight: "Amber Fort, Hawa Mahal"
  },
  {
    name: "Kerala",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=500",
    rating: 4.8,
    price: 18000,
    desc: "Backwaters & Nature",
    best: "Sep - Mar",
    highlight: "Alleppey, Munnar"
  },
  {
    name: "Agra",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=500",
    rating: 4.6,
    price: 8000,
    desc: "Taj Mahal & History",
    best: "Oct - Mar",
    highlight: "Taj Mahal, Agra Fort"
  },
  {
    name: "Mumbai",
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=500",
    rating: 4.5,
    price: 14000,
    desc: "City of Dreams",
    best: "Nov - Feb",
    highlight: "Gateway of India, Marine Drive"
  },
];

function Destinations() {

  const [selected, setSelected] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#071120] 
                    via-[#0a1b3d] to-[#09152a] text-white p-8">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-5xl font-bold">Destinations 🌍</h1>
        <p className="text-gray-400 mt-2">
         
        </p>
      </div>

      {/* CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {destinationsList.map((dest, i) => (
          <div
            key={i}
            onClick={() => setSelected(dest)}
            className="relative rounded-3xl overflow-hidden cursor-pointer group
                       hover:scale-105 transition-all duration-300
                       shadow-xl hover:shadow-blue-500/30
                       border border-white/10"
          >
            {/* IMAGE */}
            <img
              src={dest.image}
              alt={dest.name}
              className="w-full h-64 object-cover 
                         group-hover:scale-110 transition-all duration-500"
            />

            {/* DARK OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t 
                            from-black/90 via-black/30 to-transparent" />

            {/* RATING BADGE */}
            <div className="absolute top-4 right-4 bg-yellow-400/90 
                            text-black px-3 py-1 rounded-full 
                            text-sm font-bold">
              ⭐ {dest.rating}
            </div>

            {/* BOTTOM INFO */}
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h2 className="text-2xl font-bold">{dest.name}</h2>
              <p className="text-gray-300 text-sm">{dest.desc}</p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-green-400 font-semibold">
                  ₹{dest.price.toLocaleString()}/person
                </span>
                <span className="bg-blue-500/30 text-blue-300 
                                 px-3 py-1 rounded-full text-sm">
                  View Details →
                </span>
              </div>
            </div>

          </div>
        ))}

      </div>

      {/* MODAL - Click के बाद */}
      {selected && (
        <div className="fixed inset-0 bg-black/80 z-50 
                        flex items-center justify-center p-4"
             onClick={() => setSelected(null)}>

          <div className="bg-[#0a1b3d] rounded-3xl p-6 max-w-lg w-full 
                          relative border border-white/10 shadow-2xl"
               onClick={(e) => e.stopPropagation()}>

            {/* CLOSE BUTTON */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 
                         w-9 h-9 rounded-full font-bold transition-all z-10">
              ✕
            </button>

            {/* IMAGE */}
            <img
              src={selected.image}
              alt={selected.name}
              className="w-full h-56 object-cover rounded-2xl mb-5"
            />

            {/* NAME & DESC */}
            <h2 className="text-3xl font-bold">{selected.name}</h2>
            <p className="text-gray-400 mt-1">{selected.desc}</p>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-3 mt-5">
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <p className="text-gray-400 text-xs">Rating</p>
                <p className="text-yellow-400 font-bold text-lg">
                  ⭐ {selected.rating}
                </p>
              </div>
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <p className="text-gray-400 text-xs">Price</p>
                <p className="text-green-400 font-bold text-lg">
                  ₹{selected.price.toLocaleString()}
                </p>
              </div>
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <p className="text-gray-400 text-xs">Best Time</p>
                <p className="text-blue-400 font-bold text-sm mt-1">
                  {selected.best}
                </p>
              </div>
            </div>

            {/* HIGHLIGHTS */}
            <div className="mt-4 bg-white/5 rounded-xl p-4">
              <p className="text-gray-400 text-sm">🏆 Must Visit</p>
              <p className="text-white font-semibold mt-1">
                {selected.highlight}
              </p>
            </div>

            {/* BUTTON */}
            <button className="mt-5 w-full bg-blue-500 hover:bg-blue-600 
                               py-3 rounded-xl font-bold transition-all
                               hover:shadow-lg hover:shadow-blue-500/30">
              Plan Trip Here 🚀
            </button>

          </div>
        </div>
      )}

    </div>
  );
}

export default Destinations;