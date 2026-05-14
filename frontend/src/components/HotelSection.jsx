import {
  MapPin,
  Star,
  ArrowRight
} from "lucide-react";

function HotelSection({ hotels }) {

  if (!hotels || hotels.length === 0)
    return null;

  return (

    <section className="mt-20">

      {/* HEADER */}

      <div className="flex items-end justify-between mb-10">

        <div>

          <p className="
            text-cyan-400
            font-semibold
            tracking-wide
            uppercase
            text-sm
          ">

            Luxury Stays

          </p>

          <h2 className="
            text-5xl font-bold
            mt-2
          ">

            Recommended Hotels 🏨

          </h2>

          <p className="
            text-gray-400 mt-4
            max-w-2xl
            text-lg
          ">

            Discover premium hotels,
            luxury resorts and budget
            stays curated by AI for
            your destination.

          </p>

        </div>

        <button className="
          hidden md:flex
          items-center gap-2
          px-6 py-3
          rounded-2xl
          bg-white/5
          border border-white/10
          hover:bg-cyan-500
          transition-all
        ">

          View All

          <ArrowRight size={18} />

        </button>

      </div>

      {/* HOTEL GRID */}

      <div className="
        grid
        md:grid-cols-2
        xl:grid-cols-3
        gap-8
      ">

        {hotels.map((hotel, index) => (

          <div
            key={index}
            className="
              group
              relative
              overflow-hidden
              rounded-[32px]
              border border-white/10
              bg-[#101826]
              hover:-translate-y-2
              transition-all duration-500
            "
          >

            {/* IMAGE */}

            <div className="
              relative
              overflow-hidden
              h-[320px]
            ">

              <img
                src={hotel.image}
                alt={hotel.name}
                className="
                  w-full h-full
                  object-cover
                  group-hover:scale-110
                  transition-transform duration-700
                "
              />

              {/* OVERLAY */}

              <div className="
                absolute inset-0
                bg-gradient-to-t
                from-black via-black/40
                to-transparent
              " />

              {/* RATING */}

              <div className="
                absolute top-5 right-5
                px-4 py-2
                rounded-full
                bg-black/50
                backdrop-blur-md
                border border-white/10
                flex items-center gap-2
                text-sm font-semibold
              ">

                <Star
                  size={16}
                  className="text-yellow-400 fill-yellow-400"
                />

                {hotel.rating}

              </div>

              {/* HOTEL INFO */}

              <div className="
                absolute bottom-0
                p-6 w-full
              ">

                <h2 className="
                  text-3xl font-bold
                ">

                  {hotel.name}

                </h2>

                <div className="
                  flex items-center gap-2
                  text-gray-300 mt-3
                ">

                  <MapPin size={18} />

                  <p className="text-sm">

                    {hotel.location}

                  </p>

                </div>

              </div>

            </div>

            {/* BOTTOM */}

            <div className="
              p-6
              flex items-center
              justify-between
            ">

              <div>

                <p className="
                  text-gray-400 text-sm
                ">

                  Starting From

                </p>

                <h3 className="
                  text-3xl font-bold
                  text-cyan-400 mt-1
                ">

                  ₹{hotel.price}

                </h3>

              </div>

              <button className="
                px-5 py-3
                rounded-2xl
                bg-gradient-to-r
                from-cyan-500
                to-blue-500
                font-semibold
                hover:scale-105
                transition-all
              ">

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