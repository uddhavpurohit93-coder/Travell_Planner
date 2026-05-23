import { useEffect, useRef, useState } from "react";
import { ArrowLeft, MapPin, Navigation, ExternalLink, Compass } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

/**
 * MapExplore — opened when user clicks "Explore on Map" after generating a plan.
 * Uses the OpenStreetMap Nominatim API to geocode the destination, then renders
 * an interactive embed and deep links to Google Maps.
 *
 * Route: /map?destination=<encoded-name>
 */
function MapExplore() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const destination = searchParams.get("destination") || "";
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ── Geocode destination via Nominatim (no API key needed) ──────────────
  useEffect(() => {
    if (!destination) {
      setError("No destination provided.");
      setLoading(false);
      return;
    }

    const fetchCoords = async () => {
      try {
        setLoading(true);
        setError("");
        const encoded = encodeURIComponent(destination);
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encoded}&format=json&limit=1`,
          { headers: { "Accept-Language": "en" } }
        );
        const data = await res.json();
        if (!data || data.length === 0) {
          setError(`Could not find location: "${destination}"`);
          return;
        }
        setCoords({ lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon), display: data[0].display_name });
      } catch {
        setError("Failed to load map. Check your internet connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchCoords();
  }, [destination]);

  // ── OpenStreetMap embed URL ────────────────────────────────────────────
  const mapSrc = coords
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${coords.lon - 0.15}%2C${coords.lat - 0.15}%2C${coords.lon + 0.15}%2C${coords.lat + 0.15}&layer=mapnik&marker=${coords.lat}%2C${coords.lon}`
    : "";

  // ── Google Maps deep link ──────────────────────────────────────────────
  const googleMapsUrl = coords
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destination)}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destination)}`;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 shadow-sm sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl hover:bg-slate-100 transition text-slate-600"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <Compass size={20} className="text-cyan-500 flex-shrink-0" />
            <div className="min-w-0">
              <h1 className="font-black text-slate-900 text-base sm:text-lg truncate">
                Exploring: {destination}
              </h1>
              {coords && (
                <p className="text-xs text-slate-400 truncate">{coords.display}</p>
              )}
            </div>
          </div>
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-semibold shadow-lg shadow-cyan-200 hover:opacity-90 transition"
          >
            <ExternalLink size={15} />
            Open in Google Maps
          </a>
        </div>
      </header>

      {/* Map area */}
      <div className="flex-1 relative">
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 z-10 gap-4">
            <div className="w-12 h-12 rounded-full border-4 border-cyan-200 border-t-cyan-500 animate-spin" />
            <p className="text-slate-500 font-medium">Locating {destination}...</p>
          </div>
        )}

        {error && !loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6">
            <MapPin size={40} className="text-slate-300" />
            <p className="text-slate-600 font-semibold text-center">{error}</p>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold shadow-lg"
            >
              <ExternalLink size={16} />
              Open in Google Maps anyway
            </a>
          </div>
        )}

        {!loading && !error && coords && (
          <iframe
            title={`Map of ${destination}`}
            src={mapSrc}
            className="w-full h-full min-h-[60vh]"
            style={{ border: 0, minHeight: "calc(100vh - 73px)" }}
            allowFullScreen
            loading="lazy"
          />
        )}
      </div>

      {/* Mobile bottom bar */}
      <div className="sm:hidden bg-white border-t border-slate-100 p-4">
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold shadow-lg shadow-cyan-200"
        >
          <Navigation size={18} />
          Open in Google Maps
        </a>
      </div>
    </div>
  );
}

export default MapExplore;
