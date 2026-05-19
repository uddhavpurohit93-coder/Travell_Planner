import { Star, MapPin } from "lucide-react";

function FoodRecommendations({ destination }) {
  const foodData = {
    udaipur: [
      {
        name: "Dal Baati Churma",
        place: "Traditional Rajasthani Meal",
        rating: "4.9",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/9/94/Dal_Baati_Churma.jpg",
      },
      {
        name: "Laal Maas",
        place: "Rajasthani Mutton Curry",
        rating: "4.8",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/5/5c/Laal_Maas.jpg",
      },
      {
        name: "Ghewar",
        place: "Famous Rajasthani Sweet",
        rating: "4.7",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/4/4f/Ghevar.jpg",
      },
    ],

    jaipur: [
      {
        name: "Pyaaz Kachori",
        place: "Famous Jaipur Snack",
        rating: "4.9",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/1/15/Kachori_with_chutney.jpg",
      },
      {
        name: "Dal Baati Churma",
        place: "Royal Rajasthani Food",
        rating: "4.8",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/9/94/Dal_Baati_Churma.jpg",
      },
      {
        name: "Ghewar",
        place: "Traditional Jaipur Sweet",
        rating: "4.8",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/4/4f/Ghevar.jpg",
      },
    ],

    kerala: [
      {
        name: "Kerala Sadya",
        place: "Banana Leaf Meal",
        rating: "4.9",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/6/6f/Onam_Sadya.jpg",
      },
      {
        name: "Appam With Stew",
        place: "Kerala Breakfast",
        rating: "4.8",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/0/0b/Appam_with_stew.jpg",
      },
      {
        name: "Malabar Biryani",
        place: "Kerala Biryani Special",
        rating: "4.8",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/5/5f/Chicken_Biryani.jpg",
      },
    ],

    mumbai: [
      {
        name: "Vada Pav",
        place: "Mumbai Street Food",
        rating: "4.9",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/4/4e/Vada_Pav-Indian_street_food.JPG",
      },
      {
        name: "Pav Bhaji",
        place: "Famous Mumbai Dish",
        rating: "4.8",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/4/4a/Bambayya_Pav_bhaji.jpg",
      },
      {
        name: "Bombay Sandwich",
        place: "Mumbai Local Snack",
        rating: "4.7",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/7/7b/Bombay_sandwich.jpg",
      },
    ],

    goa: [
      {
        name: "Goan Fish Curry",
        place: "Coastal Goan Food",
        rating: "4.9",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/3/3e/Fish_curry_rice.jpg",
      },
      {
        name: "Prawn Curry",
        place: "Goan Seafood Special",
        rating: "4.8",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/8/8f/Prawn_curry.jpg",
      },
      {
        name: "Bebinca",
        place: "Traditional Goan Dessert",
        rating: "4.7",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/6/6b/Bebinca.jpg",
      },
    ],

    delhi: [
      {
        name: "Chole Bhature",
        place: "Delhi Street Food",
        rating: "4.9",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/9/9e/Chole_Bhature.jpg",
      },
      {
        name: "Paratha",
        place: "Old Delhi Special",
        rating: "4.8",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/a/a5/Aloo_Paratha.jpg",
      },
      {
        name: "Momos",
        place: "Popular Delhi Snack",
        rating: "4.7",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/a/a1/Momo_nepal.jpg",
      },
    ],

    varanasi: [
      {
        name: "Kachori Sabzi",
        place: "Banaras Breakfast",
        rating: "4.9",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/1/15/Kachori_with_chutney.jpg",
      },
      {
        name: "Banarasi Paan",
        place: "Famous Banaras Taste",
        rating: "4.8",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/0/08/Paan.jpg",
      },
      {
        name: "Malaiyo",
        place: "Winter Sweet Dish",
        rating: "4.7",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/5/5e/Malaiyo.jpg",
      },
    ],

    ladakh: [
      {
        name: "Thukpa",
        place: "Ladakhi Noodle Soup",
        rating: "4.9",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/6/6d/Thukpa.jpg",
      },
      {
        name: "Momos",
        place: "Mountain Snack",
        rating: "4.8",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/a/a1/Momo_nepal.jpg",
      },
      {
        name: "Butter Tea",
        place: "Traditional Himalayan Drink",
        rating: "4.6",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/3/36/Butter_tea.jpg",
      },
    ],

    default: [
      {
        name: "Dal Baati Churma",
        place: "Traditional Indian Meal",
        rating: "4.8",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/9/94/Dal_Baati_Churma.jpg",
      },
      {
        name: "Chole Bhature",
        place: "Popular North Indian Dish",
        rating: "4.7",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/9/9e/Chole_Bhature.jpg",
      },
      {
        name: "Masala Dosa",
        place: "South Indian Classic",
        rating: "4.8",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/6/6f/Masala_Dosa.JPG",
      },
    ],
  };

  const key = destination?.toLowerCase() || "default";
  const foods = foodData[key] || foodData.default;

  return (
    <section className="py-20 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="text-cyan-500 uppercase tracking-[5px] text-sm font-bold">
            Food & Dining
          </p>

          <h2 className="text-5xl font-black mt-4 text-slate-900">
            Food Recommendations 🍽️
          </h2>

          <p className="text-slate-500 mt-5 text-lg max-w-2xl">
            Famous local food experiences based on your selected destination.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {foods.map((food, index) => (
            <div
              key={index}
              className="group overflow-hidden rounded-[32px] bg-white border border-slate-200 shadow-[0_18px_45px_rgba(15,23,42,0.08)] hover:shadow-[0_28px_70px_rgba(15,23,42,0.16)] hover:-translate-y-2 transition-all duration-500"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80";
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

                <div className="absolute top-5 right-5 px-4 py-2 rounded-full bg-white/95 text-slate-900 font-bold flex items-center gap-1 shadow-lg">
                  <Star size={16} className="text-yellow-500 fill-yellow-400" />
                  {food.rating}
                </div>

                <div className="absolute bottom-5 left-5 right-5">
                  <h3 className="text-3xl font-black text-white">
                    {food.name}
                  </h3>

                  <div className="flex items-center gap-2 mt-2 text-white/90">
                    <MapPin size={17} />
                    <span>{food.place}</span>
                  </div>
                </div>
              </div>

              <div className="p-7">
                <p className="text-slate-500 leading-relaxed">
                  A must-try authentic local dish loved by travelers for its
                  real regional taste and cultural flavor.
                </p>

                <button className="mt-7 px-6 py-3 rounded-2xl bg-slate-900 text-white font-bold hover:bg-cyan-500 transition-all">
                  View Food Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FoodRecommendations;