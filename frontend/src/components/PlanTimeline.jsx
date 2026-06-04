import { useState } from "react";
import { MapPin, ArrowRight } from "lucide-react";

function PlanTimeline({ dayPlan }) {
  const [selectedDay, setSelectedDay] = useState(null);

  if (!dayPlan || dayPlan.length === 0) return null;

  const fallbackImage =
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200";

  return (
    <>
      <section className="relative bg-white rounded-[36px] border border-slate-200 shadow-[0_25px_80px_rgba(15,23,42,0.08)] p-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-100/60 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-100/50 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10">
          {/* HEADER */}
          <div className="mb-12 bg-white border border-slate-200 rounded-[30px] p-7 shadow-[0_18px_45px_rgba(15,23,42,0.07)]">
            <p className="text-cyan-500 uppercase tracking-[5px] text-sm font-semibold">
              AI Itinerary
            </p>

            <h2 className="text-5xl font-bold mt-4 text-slate-950">
              Travel Timeline 🗓
            </h2>

            <p className="text-slate-500 mt-5 text-lg max-w-2xl">
              Day-by-day personalized experiences curated specially for your
              trip.
            </p>
          </div>

          {/* TIMELINE */}
          <div className="space-y-8">
            {dayPlan.map((day, index) => {
              const firstPlace =
                day?.schedule?.[0]?.place ||
                day?.place ||
                `Day ${day.day}`;

              const image =
                day?.image && day.image.trim() !== ""
                  ? day.image
                  : fallbackImage;

              return (
                <div
                  key={index}
                  className="group grid lg:grid-cols-2 gap-6 bg-white border border-slate-200 rounded-[32px] p-4 overflow-hidden shadow-[0_18px_45px_rgba(15,23,42,0.10)] hover:shadow-[0_28px_70px_rgba(15,23,42,0.16)] hover:-translate-y-1 transition-all duration-500"
                >
                  {/* IMAGE */}
                  <div className="relative overflow-hidden h-[280px] bg-slate-100 rounded-[28px] shadow-[0_12px_30px_rgba(15,23,42,0.12)]">
                    <img
                      src={image}
                      alt={firstPlace}
                      className="w-full h-full object-cover rounded-[28px] group-hover:scale-105 transition-transform duration-700"
                      onError={(e) => {
                        e.currentTarget.src = fallbackImage;
                      }}
                    />

                    <div className="absolute inset-0 rounded-[28px] bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    <div className="absolute top-5 left-5 px-5 py-3 rounded-full bg-white/90 backdrop-blur-xl border border-white/60 shadow-[0_10px_25px_rgba(0,0,0,0.18)] font-semibold text-slate-900">
                      Day {day.day}
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-6 flex flex-col justify-between bg-gradient-to-br from-white to-slate-50 rounded-[28px] border border-slate-100">
                    <div>
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-2xl bg-cyan-50 border border-cyan-100 flex items-center justify-center">
                          <MapPin size={22} className="text-cyan-500" />
                        </div>

                        <h2 className="text-3xl font-bold text-slate-950">
                          {firstPlace}
                        </h2>
                      </div>

                      <div className="mt-6 space-y-5">
                        {day.schedule && day.schedule.length > 0 ? (
                          day.schedule.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-3 text-slate-700"
                            >
                              <MapPin
                                size={16}
                                className="text-cyan-500 mt-1"
                              />

                              <div>
                                <p className="font-semibold text-slate-900">
                                  {item.place}
                                </p>

                                <p className="text-sm text-slate-500">
                                  {item.description}
                                </p>

                                {item.distance && (
                                  <p className="text-xs text-cyan-600 mt-1">
                                    📍 {item.distance}
                                  </p>
                                )}
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-slate-500">
                            No schedule available
                          </p>
                        )}
                      </div>
                    </div>

                    {/* BOTTOM */}
                    <div className="flex items-center justify-between mt-8">
                      <div className="px-5 py-3 rounded-2xl bg-white border border-slate-200 text-slate-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_8px_20px_rgba(15,23,42,0.06)]">
                        📍 {day.schedule?.length || 0} Places Planned
                      </div>

                      <button
                        onClick={() => setSelectedDay(day)}
                        className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold shadow-[0_14px_30px_rgba(59,130,246,0.30)] hover:scale-105 transition-all"
                      >
                        Explore
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* EXPLORE MODAL */}
      {selectedDay && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[80vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">
                Day {selectedDay.day} Details
              </h2>

              <button
                onClick={() => setSelectedDay(null)}
                className="text-red-500 text-3xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              {selectedDay.schedule?.map((item, idx) => (
                <div
                  key={idx}
                  className="border rounded-2xl p-5 bg-slate-50"
                >
                  <h3 className="font-bold text-lg">
                    📍 {item.place}
                  </h3>

                  <p className="text-slate-600 mt-2">
                    {item.description}
                  </p>

                  {item.distance && (
                    <p className="text-cyan-600 mt-2">
                      Distance: {item.distance}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PlanTimeline;