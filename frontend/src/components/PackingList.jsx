import { Backpack } from "lucide-react";

function PackingList({ items }) {

  if (!items || items.length === 0)
    return null;

  return (

    <div className="
      bg-[#101826]
      border border-white/10
      rounded-2xl
      p-6
    ">

      <div className="
        flex items-center gap-3
        mb-6
      ">

        <div className="
          w-10 h-10 rounded-xl
          bg-cyan-500/10
          flex items-center justify-center
          border border-cyan-400/20
        ">

          <Backpack
            size={18}
            className="text-cyan-400"
          />

        </div>

        <div>

          <h2 className="
            text-2xl font-bold
          ">

            Packing Essentials

          </h2>

          <p className="text-gray-400">

            Smart recommendations
            based on weather

          </p>

        </div>

      </div>

      <div className="
        grid sm:grid-cols-2
        gap-4
      ">

        {items.map((item, i) => (

          <div
            key={i}
            className="
              flex items-center gap-3
              p-4 rounded-2xl
              bg-[#0d1522]
              border border-white/10
            "
          >

            <div className="
              w-7 h-7 rounded-full
              bg-green-500/20
              flex items-center justify-center
              text-green-400
              text-sm
            ">

              ✓

            </div>

            <p className="text-gray-200">

              {item}

            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default PackingList;