import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Compass, ArrowRight } from "lucide-react";

function AuthPage({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const backgrounds = [
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=80",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1800&q=80",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1800&q=80",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1800&q=80",
    "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1800&q=80",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1800&q=80",
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1800&q=80",
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1800&q=80",
    "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1800&q=80",
  ];

  const [bgIndex, setBgIndex] = useState(0);
  const [mode, setMode] = useState("welcome");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const [signupData, setSignupData] = useState({ name: "", email: "", password: "" });
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [backgrounds.length]);

  // ── SIGNUP → stores user in DB, then redirects to login ──────────────
  const handleSignup = async () => {
    if (!signupData.name || !signupData.email || !signupData.password) {
      setError("Please fill all fields");
      return;
    }
    try {
      setLoading(true);
      setError("");
      const res = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.message || "Signup failed");
        return;
      }
      // ✅ Success: show message, switch to login — do NOT auto-login
      setSuccessMsg("Account created! Please login to continue.");
      setSignupData({ name: "", email: "", password: "" });
      setMode("login");
    } catch (err) {
      setError("Server error. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  // ── LOGIN → calls backend, stores token + user, then enters app ──────
  const handleLogin = async () => {
    if (!loginData.email || !loginData.password) {
      setError("Please fill all fields");
      return;
    }
    try {
      setLoading(true);
      setError("");
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.message || "Login failed");
        return;
      }
      // ✅ Persist token and user object for the rest of the app
      localStorage.setItem("travelToken", data.token);
      localStorage.setItem("travelUser", JSON.stringify(data.user));
      setIsLoggedIn(true);
      setError("");
      // Redirect admin to admin panel, regular users to home
      navigate(data.user?.isAdmin ? "/admin" : "/home", { replace: true });
    } catch (err) {
      setError("Server error. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center px-6">
      {backgrounds.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            index === bgIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}
      <div className="absolute inset-0 bg-slate-950/45" />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/40 via-transparent to-slate-950/70" />

      <div className="relative z-10 w-full max-w-lg">
        <div className="rounded-[34px] border border-white/25 bg-white/15 backdrop-blur-xl shadow-[0_35px_100px_rgba(0,0,0,0.45)] px-9 py-10 text-center">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-[0_20px_45px_rgba(14,165,233,0.35)]">
            <Compass size={34} className="text-white" />
          </div>
          <h1 className="text-5xl font-black text-white mt-6 tracking-tight">Roamify</h1>
          <p className="text-[11px] tracking-[0.55em] uppercase text-cyan-300 font-bold mt-3">
            Your Path To Discovery
          </p>

          {/* ── WELCOME ── */}
          {mode === "welcome" && (
            <>
              <p className="text-white/85 mt-7 text-lg leading-relaxed">
                Login or create an account to start planning your AI-powered trips.
              </p>
              <div className="mt-9 space-y-4">
                <button
                  onClick={() => { setMode("login"); setError(""); setSuccessMsg(""); }}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-lg font-bold shadow-[0_16px_35px_rgba(59,130,246,0.35)] hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                  Login <ArrowRight size={20} />
                </button>
                <button
                  onClick={() => { setMode("signup"); setError(""); setSuccessMsg(""); }}
                  className="w-full py-4 rounded-2xl bg-white/90 text-slate-900 text-lg font-bold shadow-[0_12px_30px_rgba(0,0,0,0.18)] hover:bg-white hover:scale-[1.02] transition-all"
                >
                  Create Account
                </button>
              </div>
              <p className="text-white/65 text-sm mt-7">
                You must login first to search and save trips.
              </p>
            </>
          )}

          {/* ── LOGIN ── */}
          {mode === "login" && (
            <>
              <h2 className="text-3xl font-black text-white mt-7">Welcome Back</h2>
              <p className="text-white/75 mt-3">Login to continue your travel journey.</p>
              {successMsg && (
                <p className="mt-4 text-green-300 text-sm font-semibold bg-green-500/10 rounded-xl py-2 px-4">
                  ✅ {successMsg}
                </p>
              )}
              <div className="mt-7 space-y-4">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  className="w-full px-5 py-4 rounded-2xl bg-white/90 border border-white/40 outline-none text-slate-900 placeholder:text-slate-400"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  className="w-full px-5 py-4 rounded-2xl bg-white/90 border border-white/40 outline-none text-slate-900 placeholder:text-slate-400"
                />
                {error && <p className="text-red-300 text-sm font-semibold">{error}</p>}
                <button
                  onClick={handleLogin}
                  disabled={loading}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-lg font-bold shadow-[0_16px_35px_rgba(59,130,246,0.35)] hover:scale-[1.02] transition-all disabled:opacity-60"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </div>
              <p className="text-white/75 text-sm mt-6">
                Don't have an account?{" "}
                <button onClick={() => { setMode("signup"); setError(""); setSuccessMsg(""); }} className="text-cyan-300 font-bold">
                  Create Account
                </button>
              </p>
              <button onClick={() => { setMode("welcome"); setError(""); setSuccessMsg(""); }} className="text-white/55 text-sm mt-4">
                Back
              </button>
            </>
          )}

          {/* ── SIGNUP ── */}
          {mode === "signup" && (
            <>
              <h2 className="text-3xl font-black text-white mt-7">Create Account</h2>
              <p className="text-white/75 mt-3">Signup to start planning your AI trips.</p>
              <div className="mt-7 space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={signupData.name}
                  onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                  className="w-full px-5 py-4 rounded-2xl bg-white/90 border border-white/40 outline-none text-slate-900 placeholder:text-slate-400"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={signupData.email}
                  onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                  className="w-full px-5 py-4 rounded-2xl bg-white/90 border border-white/40 outline-none text-slate-900 placeholder:text-slate-400"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={signupData.password}
                  onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                  className="w-full px-5 py-4 rounded-2xl bg-white/90 border border-white/40 outline-none text-slate-900 placeholder:text-slate-400"
                />
                {error && <p className="text-red-300 text-sm font-semibold">{error}</p>}
                <button
                  onClick={handleSignup}
                  disabled={loading}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-lg font-bold shadow-[0_16px_35px_rgba(59,130,246,0.35)] hover:scale-[1.02] transition-all disabled:opacity-60"
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
              </div>
              <p className="text-white/75 text-sm mt-6">
                Already have an account?{" "}
                <button onClick={() => { setMode("login"); setError(""); setSuccessMsg(""); }} className="text-cyan-300 font-bold">
                  Login
                </button>
              </p>
              <button onClick={() => { setMode("welcome"); setError(""); setSuccessMsg(""); }} className="text-white/55 text-sm mt-4">
                Back
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
