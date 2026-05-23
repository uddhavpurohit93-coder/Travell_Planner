import { useState } from "react";
import { Star, MapPin, X, ExternalLink } from "lucide-react";

// ── Static fallback data for popular Indian cities ──────────────────────
const STATIC_FOOD = {
  udaipur: [
    { name: "Dal Baati Churma", place: "Traditional Rajasthani Meal", rating: "4.9", image: "https://upload.wikimedia.org/wikipedia/commons/9/94/Dal_Baati_Churma.jpg", description: "The iconic Rajasthani thali with lentil curry, baked wheat balls, and sweet crumbled wheat dessert. A true taste of royal Rajasthan." },
    { name: "Laal Maas", place: "Rajasthani Mutton Curry", rating: "4.8", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500", description: "A fiery red mutton curry cooked with mathania chillies and local spices. The signature non-veg dish of Rajasthan." },
    { name: "Ghewar", place: "Famous Rajasthani Sweet", rating: "4.7", image: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Ghevar.jpg", description: "A disc-shaped sweet made of flour and soaked in sugar syrup — a Rajasthan festive favourite." },
  ],
  jaipur: [
    { name: "Pyaaz Kachori", place: "Famous Jaipur Snack", rating: "4.9", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500", description: "Flaky deep-fried pastry stuffed with spiced onion filling. The quintessential Jaipur street snack." },
    { name: "Dal Baati Churma", place: "Royal Rajasthani Food", rating: "4.8", image: "https://upload.wikimedia.org/wikipedia/commons/9/94/Dal_Baati_Churma.jpg", description: "A wholesome meal enjoyed across Rajasthan, especially in Jaipur's heritage restaurants." },
    { name: "Ghewar", place: "Traditional Jaipur Sweet", rating: "4.8", image: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Ghevar.jpg", description: "Jaipur's famous honeycomb sweet drenched in saffron-infused sugar syrup." },
  ],
  delhi: [
    { name: "Chole Bhature", place: "Delhi Street Food", rating: "4.9", image: "https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?w=500", description: "Fluffy fried bread served with spicy chickpea curry — Delhi's most beloved breakfast." },
    { name: "Paratha", place: "Old Delhi Special", rating: "4.8", image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c3?w=500", description: "Paranthewali Gali in Chandni Chowk serves stuffed parathas with a century-old legacy." },
    { name: "Butter Chicken", place: "Moti Mahal, Daryaganj", rating: "5.0", image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500", description: "The birthplace of Butter Chicken. Rich tomato-cream curry that is now loved worldwide." },
  ],
  mumbai: [
    { name: "Vada Pav", place: "Mumbai Street Food", rating: "4.9", image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500", description: "Mumbai's soul food — a spiced potato fritter in a bun with chutneys. Eaten on every street corner." },
    { name: "Pav Bhaji", place: "Famous Mumbai Dish", rating: "4.8", image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500", description: "A buttery mashed vegetable curry served with toasted bread rolls. A Marine Drive evening staple." },
    { name: "Bombay Sandwich", place: "Chowpatty Beach Area", rating: "4.7", image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500", description: "Layered green chutney sandwich loaded with potatoes and cucumber — unique to Mumbai." },
  ],
  goa: [
    { name: "Goan Fish Curry", place: "Coastal Goan Food", rating: "4.9", image: "https://images.unsplash.com/photo-1585937421612-70a008356c36?w=500", description: "Tangy coconut milk curry with fresh local fish. The defining dish of Goan cuisine." },
    { name: "Bebinca", place: "Traditional Goan Dessert", rating: "4.8", image: "https://images.unsplash.com/photo-1559622214-f8a9850965bb?w=500", description: "A layered Goan pudding made from coconut milk, egg yolks and ghee — a Portuguese-influenced delicacy." },
    { name: "Prawn Balchão", place: "North Goa Restaurants", rating: "4.7", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500", description: "Fiery prawn pickle curry cooked with vinegar and Kashmiri chillies. Intensely flavourful." },
  ],
  manali: [
    { name: "Siddu", place: "Traditional Himachali Bread", rating: "4.8", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500", description: "Steamed wheat buns stuffed with poppy seeds and walnuts — a Manali winter staple." },
    { name: "Trout Fish", place: "Riverside Restaurants", rating: "4.9", image: "https://images.unsplash.com/photo-1615361200141-f45040f367be?w=500", description: "Fresh Beas River trout grilled or pan-fried. A must-have in Manali's mountain eateries." },
    { name: "Dham", place: "Local Thali Experience", rating: "4.7", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500", description: "A Himachali festive meal with madra, rice, pulses and dessert — a complete cultural experience." },
  ],
};

function FoodRecommendations({ destination, foodData }) {
  const [modal, setModal] = useState(null);

  if (!destination?.trim()) return null;

  // ── Use AI-generated food data if available, else fallback to static ──
  let foods = [];
  if (foodData && Array.isArray(foodData) && foodData.length > 0) {
    foods = foodData.map((item) => ({
      name: typeof item === "string" ? item : item.name,
      place: destination,
      rating: "4.7",
      image: item.image || `https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500`,
      description: `A must-try dish in ${destination}, loved by locals and travellers alike.`,
    }));
  } else {
    const key = destination.toLowerCase().trim();
    const matched = Object.entries(STATIC_FOOD).find(([city]) => key.includes(city));
    if (matched) foods = matched[1];
  }

  if (foods.length === 0) {
    // Generic fallback for any unknown city
    foods = [
      { name: "Local Street Food", place: destination, rating: "4.7", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500", description: `Explore the vibrant street food culture of ${destination}.` },
      { name: "Regional Thali", place: destination, rating: "4.8", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500", description: `A wholesome regional platter showcasing the best flavours of ${destination}.` },
      { name: "Local Sweet", place: destination, rating: "4.6", image: "https://images.unsplash.com/photo-1559622214-f8a9850965bb?w=500", description: `Indulge in the signature sweet of ${destination} — a beloved local treat.` },
    ];
  }

  return (
    <section className="py-20 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="text-cyan-500 uppercase tracking-[5px] text-sm font-bold">Food & Dining</p>
          <h2 className="text-5xl font-black mt-4 text-slate-900">Food Recommendations 🍽️</h2>
          <p className="text-slate-500 mt-5 text-lg max-w-2xl">
            Famous local food experiences based on your destination.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {foods.map((food, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-[32px] bg-white border border-slate-200 shadow-[0_18px_45px_rgba(15,23,42,0.08)] hover:shadow-[0_28px_70px_rgba(15,23,42,0.16)] hover:-translate-y-2 transition-all duration-500"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-full h-full object-cover hover:scale-110 transition-all duration-700"
                  onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500"; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute top-5 right-5 bg-white rounded-full px-4 py-2 flex items-center gap-1 font-bold shadow-lg">
                  <Star size={16} className="text-yellow-500 fill-yellow-400" />
                  {food.rating}
                </div>
                <div className="absolute bottom-5 left-5 right-5">
                  <h3 className="text-3xl font-black text-white">{food.name}</h3>
                  <div className="flex items-center gap-2 mt-2 text-white/90">
                    <MapPin size={16} />
                    <span>{food.place}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <p className="text-slate-500 leading-relaxed">{food.description}</p>
                <button
                  onClick={() => setModal(food)}
                  className="mt-6 px-6 py-3 rounded-2xl bg-slate-900 text-white font-bold hover:bg-cyan-500 transition-all"
                >
                  Food Suggestions →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {modal && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={() => setModal(null)}
        >
          <div
            className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setModal(null)} className="absolute top-4 right-4 bg-red-500 text-white w-9 h-9 rounded-full font-bold hover:bg-red-600 transition-all flex items-center justify-center">
              <X size={18} />
            </button>
            <img src={modal.image} alt={modal.name} className="w-full h-48 object-cover rounded-2xl mb-5"
              onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500"; }} />
            <h2 className="text-2xl font-black text-slate-900">{modal.name}</h2>
            <div className="flex items-center gap-2 mt-2 text-slate-500 text-sm">
              <MapPin size={14} /> {modal.place}
            </div>
            <div className="flex items-center gap-1 mt-2">
              <Star size={14} className="text-yellow-500 fill-yellow-400" />
              <span className="font-bold text-slate-700">{modal.rating}</span>
            </div>
            <p className="text-slate-500 mt-4 leading-relaxed">{modal.description}</p>
            <a
              href={`https://www.google.com/search?q=${encodeURIComponent(modal.name + " " + modal.place + " food")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all"
            >
              Search on Google <ExternalLink size={16} />
            </a>
          </div>
        </div>
      )}
    </section>
  );
}

export default FoodRecommendations;
