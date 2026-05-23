import { useState } from "react";
import {
  Search,
  MapPin,
  Star,
  CalendarDays,
  IndianRupee,
  X,
} from "lucide-react";

const fallbackImage =
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&auto=format&fit=crop&q=90";

const destinationsList = [
  {
    name: "Goa",
    category: "Beach",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=900&auto=format&fit=crop&q=90",
    rating: 4.8,
    price: 12000,
    desc: "Beaches & Nightlife",
    best: "Nov - Feb",
    duration: "4 Days",
    highlight: "Baga Beach, Dudhsagar Falls",
  },
  {
    name: "Manali",
    category: "Mountain",
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=900&auto=format&fit=crop&q=90",
    rating: 4.9,
    price: 15000,
    desc: "Snow Mountains",
    best: "Dec - Feb",
    duration: "5 Days",
    highlight: "Rohtang Pass, Solang Valley",
  },
  {
    name: "Jaipur",
    category: "Heritage",
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=900&auto=format&fit=crop&q=90",
    rating: 4.7,
    price: 10000,
    desc: "Royal Heritage",
    best: "Oct - Mar",
    duration: "3 Days",
    highlight: "Amber Fort, Hawa Mahal",
  },
  {
    name: "Kerala",
    category: "Nature",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=900&auto=format&fit=crop&q=90",
    rating: 4.8,
    price: 18000,
    desc: "Backwaters & Nature",
    best: "Sep - Mar",
    duration: "5 Days",
    highlight: "Alleppey, Munnar",
  },
  {
    name: "Agra",
    category: "Heritage",
    image:
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=900&auto=format&fit=crop&q=90",
    rating: 4.6,
    price: 8000,
    desc: "Taj Mahal & History",
    best: "Oct - Mar",
    duration: "2 Days",
    highlight: "Taj Mahal, Agra Fort",
  },
  {
    name: "Mumbai",
    category: "City",
    image:
      "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=900&auto=format&fit=crop&q=90",
    rating: 4.5,
    price: 14000,
    desc: "City of Dreams",
    best: "Nov - Feb",
    duration: "3 Days",
    highlight: "Gateway of India, Marine Drive",
  },
  {
    name: "Udaipur",
    category: "Heritage",
    image:
      "https://www.tripsavvy.com/thmb/saxdtK__W0j14gkQ2tEjjAkEB-Y=/2121x1414/filters:fill(auto,1)/GettyImages-956035876-76efc27d14d24032a3f3d1fcefdc4413.jpg",
    rating: 4.9,
    price: 13000,
    desc: "City of Lakes",
    best: "Sep - Mar",
    duration: "3 Days",
    highlight: "City Palace, Lake Pichola",
  },
  {
    name: "Jaisalmer",
    category: "Desert",
    image:
      "https://res.cloudinary.com/kmadmin/image/upload/v1725880851/kiomoi/jaislamer_fort_images_4092.jpg",
    rating: 4.8,
    price: 16000,
    desc: "Golden Desert",
    best: "Oct - Mar",
    duration: "3 Days",
    highlight: "Sam Sand Dunes, Jaisalmer Fort",
  },
  {
    name: "Rishikesh",
    category: "Adventure",
    image:
      "https://tse1.mm.bing.net/th/id/OIP.8iV9okQnAaujk0nrESjMKgHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
    rating: 4.7,
    price: 9000,
    desc: "Rafting & Yoga",
    best: "Sep - Apr",
    duration: "3 Days",
    highlight: "River Rafting, Laxman Jhula",
  },
  {
    name: "Ladakh",
    category: "Adventure",
    image:
      "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=900&auto=format&fit=crop&q=90",
    rating: 4.9,
    price: 22000,
    desc: "High Passes & Lakes",
    best: "May - Sep",
    duration: "6 Days",
    highlight: "Pangong Lake, Nubra Valley",
  },
  {
    name: "Darjeeling",
    category: "Mountain",
    image:
      "https://tse4.mm.bing.net/th/id/OIP.gGSYdeFWBe7T-F1ml-TiEwHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
    rating: 4.7,
    price: 16000,
    desc: "Tea Gardens & Hills",
    best: "Mar - May",
    duration: "4 Days",
    highlight: "Tiger Hill, Tea Gardens",
  },
  {
    name: "Varanasi",
    category: "Spiritual",
    image:
      "https://thumbs.dreamstime.com/z/varanasi-historic-city-ancient-architectural-buildings-temples-along-ganges-river-bank-india-october-old-ghat-as-180836757.jpg",
    rating: 4.6,
    price: 7000,
    desc: "Ghats & Spirituality",
    best: "Oct - Mar",
    duration: "2 Days",
    highlight: "Ganga Aarti, Kashi Vishwanath",
  },
  {
    name: "Andaman",
    category: "Beach",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.Z8X_ISIxlNUT871SvekhCQHaFj?rs=1&pid=ImgDetMain&o=7&rm=3",
    rating: 4.9,
    price: 25000,
    desc: "Islands & Blue Water",
    best: "Oct - May",
    duration: "5 Days",
    highlight: "Radhanagar Beach, Cellular Jail",
  },
  {
    name: "Shimla",
    category: "Mountain",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=900&auto=format&fit=crop&q=90",
    rating: 4.6,
    price: 11000,
    desc: "Hill Station Charm",
    best: "Mar - Jun",
    duration: "3 Days",
    highlight: "Mall Road, Kufri",
  },
  {
    name: "Mysore",
    category: "Heritage",
    image:
      "https://images.unsplash.com/photo-1600112356915-089abb8fc71a?w=900&auto=format&fit=crop&q=90",
    rating: 4.7,
    price: 9500,
    desc: "Palaces & Culture",
    best: "Oct - Feb",
    duration: "2 Days",
    highlight: "Mysore Palace, Chamundi Hills",
  },
  {
    name: "Ooty",
    category: "Mountain",
    image:
      "https://s3.india.com/wp-content/uploads/2024/07/Historical-Places-To-Visit-In-Ooty.jpg##image/jpg",
    rating: 4.6,
    price: 12000,
    desc: "Queen of Hill Stations",
    best: "Oct - Jun",
    duration: "3 Days",
    highlight: "Ooty Lake, Botanical Garden",
  },
  {
    name: "Coorg",
    category: "Nature",
    image:
      "https://media.cntraveller.in/wp-content/uploads/2019/08/Coorg-1.jpg",
    rating: 4.8,
    price: 14000,
    desc: "Coffee Hills & Waterfalls",
    best: "Oct - Mar",
    duration: "3 Days",
    highlight: "Abbey Falls, Coffee Plantations",
  },
  {
    name: "Amritsar",
    category: "Spiritual",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.mjkUA6uBd_g5NEkoLbMxoQHaFj?rs=1&pid=ImgDetMain&o=7&rm=3",
    rating: 4.7,
    price: 8500,
    desc: "Golden Temple & Culture",
    best: "Nov - Mar",
    duration: "2 Days",
    highlight: "Golden Temple, Wagah Border",
  },
  {
    name: "Hampi",
    category: "Heritage",
    image:
      "https://edge.ixigo.com/ixi-api/img/511a1afde4b015f836876ac5_600x315.jpg",
    rating: 4.8,
    price: 10000,
    desc: "Ancient Ruins & Temples",
    best: "Oct - Feb",
    duration: "3 Days",
    highlight: "Virupaksha Temple, Stone Chariot",
  },
  {
    name: "Pondicherry",
    category: "Beach",
    image:
      "https://th.bing.com/th/id/OIP.uH4mM94WhpFGTzp4zbntjQHaEO?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3",
    rating: 4.6,
    price: 11000,
    desc: "French Streets & Beaches",
    best: "Oct - Mar",
    duration: "3 Days",
    highlight: "Promenade Beach, White Town",
  },
  {
    name: "Nainital",
    category: "Mountain",
    image:
      "https://www.holidify.com/images/cmsuploads/compressed/19421484519_dd4e3f4009_b_20190514143704.jpg",
    rating: 4.7,
    price: 11500,
    desc: "Lake City in Hills",
    best: "Mar - Jun",
    duration: "3 Days",
    highlight: "Naini Lake, Snow View Point",
  },
  {
    name: "Sikkim",
    category: "Mountain",
    image:
      "https://tse4.mm.bing.net/th/id/OIP.DNUD_8fEit5yMwbHyhtDagHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
    rating: 4.9,
    price: 21000,
    desc: "Himalayan Beauty",
    best: "Mar - May",
    duration: "5 Days",
    highlight: "Tsomgo Lake, Nathula Pass",
  },
  {
    name: "Kutch",
    category: "Desert",
    image:
      "https://tse1.mm.bing.net/th/id/OIP.Jvx5FCg8sPtRn2Q34JmLswHaE7?rs=1&pid=ImgDetMain&o=7&rm=3",
    rating: 4.7,
    price: 15000,
    desc: "White Desert Festival",
    best: "Nov - Feb",
    duration: "3 Days",
    highlight: "Rann of Kutch, Tent City",
  },
  {
    name: "Hyderabad",
    category: "City",
    image:
      "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=900&auto=format&fit=crop&q=90",
    rating: 4.6,
    price: 10500,
    desc: "Biryani & Monuments",
    best: "Oct - Feb",
    duration: "3 Days",
    highlight: "Charminar, Golconda Fort",
  },
  {
    name: "Meghalaya",
    category: "Nature",
    image:
      "https://assets.shortpedia.com/Voices/wp-content/uploads/2021/06/Meghalaya-1200x900-1.jpg",
    rating: 4.9,
    price: 23000,
    desc: "Clouds, Caves & Waterfalls",
    best: "Oct - Apr",
    duration: "5 Days",
    highlight: "Cherrapunji, Living Root Bridge",
  },
    {
    name: "Auli",
    category: "Mountain",
    image:
      "https://travelvaidya.com/blog/wp-content/uploads/2025/05/1-1024x512.webp",
    rating: 4.8,
    price: 17000,
    desc: "Snow Slopes & Skiing",
    best: "Dec - Mar",
    duration: "4 Days",
    highlight: "Skiing, Ropeway, Himalayan Views",
  },
  {
    name: "Kodaikanal",
    category: "Mountain",
    image:
      "https://static.toiimg.com/photo/msid-78034444,width-96,height-65.cms",
    rating: 4.7,
    price: 12500,
    desc: "Peaceful Hills & Lakes",
    best: "Oct - Jun",
    duration: "3 Days",
    highlight: "Kodai Lake, Coaker's Walk",
  },
  {
    name: "Lakshadweep",
    category: "Beach",
    image:
      "https://cdn.britannica.com/32/1632-050-940FB0E6/Beach-resort-Bangaram-Island-India-Lakshadweep.jpg",
    rating: 4.9,
    price: 28000,
    desc: "Blue Lagoons & Islands",
    best: "Oct - May",
    duration: "5 Days",
    highlight: "Agatti Island, Bangaram Island",
  },
  {
    name: "Kolkata",
    category: "City",
    image:
      "https://images.unsplash.com/photo-1558431382-27e303142255?w=900&auto=format&fit=crop&q=90",
    rating: 4.5,
    price: 9500,
    desc: "Culture, Food & Heritage",
    best: "Oct - Feb",
    duration: "3 Days",
    highlight: "Victoria Memorial, Howrah Bridge",
  },
  {
    name: "Mahabaleshwar",
    category: "Nature",
    image:
      "https://travelogyindia.b-cdn.net/blog/wp-content/uploads/2019/08/Mahabaleshwar-in-Monsoon.jpg",
    rating: 4.6,
    price: 10500,
    desc: "Strawberries & Viewpoints",
    best: "Oct - Jun",
    duration: "3 Days",
    highlight: "Arthur Seat, Venna Lake",
  },
];
const categories = [
  "All",
  "Beach",
  "Mountain",
  "Heritage",
  "Nature",
  "Adventure",
  "City",
  "Desert",
  "Spiritual",
];

function Destinations() {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredDestinations = destinationsList.filter((dest) => {
    const searchText = search.toLowerCase();

    const matchSearch =
      dest.name.toLowerCase().includes(searchText) ||
      dest.desc.toLowerCase().includes(searchText) ||
      dest.category.toLowerCase().includes(searchText) ||
      dest.highlight.toLowerCase().includes(searchText);

    const matchCategory =
      activeCategory === "All" || dest.category === activeCategory;

    return matchSearch && matchCategory;
  });

  const openMap = (place) => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        place
      )}`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 px-8 py-10">
      {/* HEADER */}
      <div className="mb-8 flex flex-col xl:flex-row xl:items-end xl:justify-between gap-6">
        <div>
          <h1 className="text-5xl font-black text-slate-900">
            Destinations 🌍
          </h1>

          <p className="text-slate-500 mt-3 text-lg">
            Explore beautiful places for your next journey.
          </p>
        </div>

        {/* SEARCH BAR */}
        <div className="w-full xl:w-[430px] bg-white border border-slate-200 rounded-2xl px-5 py-4 flex items-center gap-3 shadow-sm">
          <Search size={20} className="text-cyan-500" />

          <input
            type="text"
            placeholder="Search city, beach, mountain..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none w-full text-slate-900 placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* CATEGORY FILTER */}
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-5 py-2.5 rounded-full border text-sm font-bold transition-all ${
              activeCategory === category
                ? "bg-gradient-to-r from-cyan-500 to-blue-500 border-cyan-400 text-white shadow-lg shadow-cyan-500/25"
                : "bg-white border-slate-200 text-slate-600 hover:border-cyan-300 hover:text-cyan-500"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* RESULT COUNT */}
      <div className="mb-5 text-slate-500 text-sm">
        Showing{" "}
        <span className="text-cyan-500 font-bold">
          {filteredDestinations.length}
        </span>{" "}
        destinations
      </div>

      {/* CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
        {filteredDestinations.map((dest, i) => (
          <div
            key={i}
            onClick={() => setSelected(dest)}
            className="relative rounded-3xl overflow-hidden cursor-pointer group hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl border border-slate-200 h-72 bg-slate-100"
          >
            <img
              src={dest.image}
              alt={dest.name}
              onError={(e) => {
                e.currentTarget.src = fallbackImage;
              }}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/5" />

            <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-black flex items-center gap-1">
              <Star size={14} fill="currentColor" />
              {dest.rating}
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h2 className="text-2xl font-black text-white">{dest.name}</h2>

              <p className="text-slate-200 text-sm">{dest.desc}</p>

              <div className="flex justify-between items-center mt-3 gap-3">
                <span className="text-green-300 font-bold">
                  ₹{dest.price.toLocaleString()}/person
                </span>

                <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm whitespace-nowrap">
                  View Details →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDestinations.length === 0 && (
        <div className="text-center mt-20 text-slate-500 text-xl">
          No destination found.
        </div>
      )}

      {/* MODAL */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/60 z-[999] flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-3xl p-6 max-w-lg w-full relative border border-slate-200 shadow-2xl text-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white w-9 h-9 rounded-full font-bold transition-all z-10 flex items-center justify-center"
            >
              <X size={18} />
            </button>

            <img
              src={selected.image}
              alt={selected.name}
              onError={(e) => {
                e.currentTarget.src = fallbackImage;
              }}
              className="w-full h-56 object-cover rounded-2xl mb-5"
            />

            <h2 className="text-3xl font-black text-slate-900">
              {selected.name}
            </h2>

            <p className="text-slate-500 mt-1">{selected.desc}</p>

            <div className="grid grid-cols-3 gap-3 mt-5">
              <div className="bg-slate-50 rounded-xl p-3 text-center border border-slate-200">
                <p className="text-slate-500 text-xs">Rating</p>
                <p className="text-yellow-500 font-black text-lg flex items-center justify-center gap-1">
                  <Star size={15} fill="currentColor" />
                  {selected.rating}
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-3 text-center border border-slate-200">
                <p className="text-slate-500 text-xs">Price</p>
                <p className="text-green-500 font-black text-lg flex items-center justify-center">
                  <IndianRupee size={15} />
                  {selected.price.toLocaleString()}
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-3 text-center border border-slate-200">
                <p className="text-slate-500 text-xs">Best Time</p>
                <p className="text-blue-500 font-black text-sm mt-1">
                  {selected.best}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <p className="text-slate-500 text-sm flex items-center gap-2">
                  <CalendarDays size={15} />
                  Duration
                </p>

                <p className="text-slate-900 font-bold mt-1">
                  {selected.duration}
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <p className="text-slate-500 text-sm flex items-center gap-2">
                  <MapPin size={15} />
                  Category
                </p>

                <p className="text-slate-900 font-bold mt-1">
                  {selected.category}
                </p>
              </div>
            </div>

            <div className="mt-4 bg-slate-50 rounded-xl p-4 border border-slate-200">
              <p className="text-slate-500 text-sm">🏆 Must Visit</p>

              <p className="text-slate-900 font-bold mt-1">
                {selected.highlight}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
              <button
                onClick={() => openMap(selected.name)}
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-xl font-bold transition-all hover:shadow-lg hover:shadow-cyan-500/30"
              >
                Open Google Map
              </button>

              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-bold transition-all hover:shadow-lg hover:shadow-blue-500/30">
                Plan Trip Here 🚀
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Destinations;