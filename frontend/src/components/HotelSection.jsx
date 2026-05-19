import { useEffect, useState } from "react";
import { MapPin, Star, ArrowRight } from "lucide-react";
import { getPhotos } from "../services/photoApi";

function HotelSection({ hotels, destination = "Udaipur" }) {
  const [hotelData, setHotelData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadHotels = async () => {
      if (hotels && hotels.length > 0) {
        setHotelData(hotels);
        return;
      }

      setLoading(true);

      const photos = await getPhotos(`${destination} luxury hotel resort`);

      const generatedHotels = [
        {
          name: `${destination} Grand Palace`,
          location: `${destination}, India`,
          price: "4,500/night",
          rating: "4.8",
          image: photos[0]?.image,
        },
        {
          name: `${destination} Lake View Resort`,
          location: `${destination}, India`,
          price: "5,200/night",
          rating: "4.7",
          image: photos[1]?.image,
        },
        {
          name: `${destination} Heritage Stay`,
          location: `${destination}, India`,
          price: "3,800/night",
          rating: "4.6",
          image: photos[2]?.image,
        },
      ];

      setHotelData(generatedHotels);
      setLoading(false);
    };

    loadHotels();
  }, [hotels, destination]);

  if (loading) {
    return (
      <section className="mt-20">
        <p className="text-slate-500 text-lg">Loading hotel recommendations...</p>
      </section>
    );
  }

  if (!hotelData || hotelData.length === 0) return null;

  return (
    <section className="mt-20">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-cyan-500 font-semibold tracking-wide uppercase text-sm">
            Luxury Stays
          </p>

          <h2 className="text-5xl font-bold mt-2 text-slate-900">
            Recommended Hotels 🏨
          </h2>

          <p className="text-slate-500 mt-4 max-w-2xl text-lg">
            Discover premium hotels, luxury resorts and budget stays curated by AI for your destination.
          </p>
        </div>

        <button className="hidden md:flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:bg-cyan-500 hover:text-white transition-all shadow-sm">
          View All
          <ArrowRight size={18} />
        </button>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {hotelData.map((hotel, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-[32px] border border-slate-200 bg-white hover:-translate-y-2 transition-all duration-500 shadow-sm hover:shadow-xl"
          >
            <div className="relative overflow-hidden h-[320px]">
              <img
                src={
                  hotel.image ||
                  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"
                }
                alt={hotel.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              <div className="absolute top-5 right-5 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-white/60 flex items-center gap-2 text-sm font-semibold text-slate-900">
                <Star size={16} className="text-yellow-400 fill-yellow-400" />
                {hotel.rating}
              </div>

              <div className="absolute bottom-0 p-6 w-full">
                <h2 className="text-3xl font-bold text-white">
                  {hotel.name}
                </h2>

                <div className="flex items-center gap-2 text-slate-200 mt-3">
                  <MapPin size={18} />
                  <p className="text-sm">{hotel.location}</p>
                </div>
              </div>
            </div>

            <div className="p-6 flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm">Starting From</p>

                <h3 className="text-3xl font-bold text-cyan-500 mt-1">
                  ₹{hotel.price}
                </h3>
              </div>

              <button className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:scale-105 transition-all">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HotelSection;