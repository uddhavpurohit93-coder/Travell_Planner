import { Backpack } from "lucide-react";

function PackingList({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center border border-cyan-100">
          <Backpack size={18} className="text-cyan-500" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Packing Essentials
          </h2>

          <p className="text-slate-500">
            Smart recommendations based on weather
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200"
          >
            <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-sm">
              ✓
            </div>

            <p className="text-slate-700">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PackingList;