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

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [backgrounds.length]);

  const handleSignup = () => {
    if (!signupData.name || !signupData.email || !signupData.password) {
      setError("Please fill all fields");
      return;
    }

    localStorage.setItem("roamifyUser", JSON.stringify(signupData));
    localStorage.setItem("isLoggedIn", "true");

    setIsLoggedIn(true);
    setError("");

    navigate("/home", { replace: true });
  };

  const handleLogin = () => {
    const savedUser = JSON.parse(localStorage.getItem("roamifyUser"));

    if (!savedUser) {
      setError("Please create account first");
      return;
    }

    if (
      loginData.email === savedUser.email &&
      loginData.password === savedUser.password
    ) {
      localStorage.setItem("isLoggedIn", "true");

      setIsLoggedIn(true);
      setError("");

      navigate("/home", { replace: true });
    } else {
      setError("Email or password is incorrect");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center px-6">
      {/* BACKGROUND SLIDER */}
      {backgrounds.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            index === bgIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${image})`,
          }}
        />
      ))}

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-slate-950/45" />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/40 via-transparent to-slate-950/70" />

      {/* AUTH BOX */}
      <div className="relative z-10 w-full max-w-lg">
        <div className="rounded-[34px] border border-white/25 bg-white/15 backdrop-blur-xl shadow-[0_35px_100px_rgba(0,0,0,0.45)] px-9 py-10 text-center">
          {/* LOGO ICON */}
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-[0_20px_45px_rgba(14,165,233,0.35)]">
            <Compass size={34} className="text-white" />
          </div>

          <h1 className="text-5xl font-black text-white mt-6 tracking-tight">
            Roamify
          </h1>

          <p className="text-[11px] tracking-[0.55em] uppercase text-cyan-300 font-bold mt-3">
            Your Path To Discovery
          </p>

          {/* WELCOME SCREEN */}
          {mode === "welcome" && (
            <>
              <p className="text-white/85 mt-7 text-lg leading-relaxed">
                Login or create an account to start planning your AI-powered
                trips.
              </p>

              <div className="mt-9 space-y-4">
                <button
                  onClick={() => {
                    setMode("login");
                    setError("");
                  }}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-lg font-bold shadow-[0_16px_35px_rgba(59,130,246,0.35)] hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                  Login <ArrowRight size={20} />
                </button>

                <button
                  onClick={() => {
                    setMode("signup");
                    setError("");
                  }}
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

          {/* LOGIN FORM */}
          {mode === "login" && (
            <>
              <h2 className="text-3xl font-black text-white mt-7">
                Welcome Back
              </h2>

              <p className="text-white/75 mt-3">
                Login to continue your travel journey.
              </p>

              <div className="mt-7 space-y-4">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                  className="w-full px-5 py-4 rounded-2xl bg-white/90 border border-white/40 outline-none text-slate-900 placeholder:text-slate-400"
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                  className="w-full px-5 py-4 rounded-2xl bg-white/90 border border-white/40 outline-none text-slate-900 placeholder:text-slate-400"
                />

                {error && (
                  <p className="text-red-300 text-sm font-semibold">{error}</p>
                )}

                <button
                  onClick={handleLogin}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-lg font-bold shadow-[0_16px_35px_rgba(59,130,246,0.35)] hover:scale-[1.02] transition-all"
                >
                  Login
                </button>
              </div>

              <p className="text-white/75 text-sm mt-6">
                Don't have an account?{" "}
                <button
                  onClick={() => {
                    setMode("signup");
                    setError("");
                  }}
                  className="text-cyan-300 font-bold"
                >
                  Create Account
                </button>
              </p>

              <button
                onClick={() => {
                  setMode("welcome");
                  setError("");
                }}
                className="text-white/55 text-sm mt-4"
              >
                Back
              </button>
            </>
          )}

          {/* SIGNUP FORM */}
          {mode === "signup" && (
            <>
              <h2 className="text-3xl font-black text-white mt-7">
                Create Account
              </h2>

              <p className="text-white/75 mt-3">
                Signup to start planning your AI trips.
              </p>

              <div className="mt-7 space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={signupData.name}
                  onChange={(e) =>
                    setSignupData({ ...signupData, name: e.target.value })
                  }
                  className="w-full px-5 py-4 rounded-2xl bg-white/90 border border-white/40 outline-none text-slate-900 placeholder:text-slate-400"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  value={signupData.email}
                  onChange={(e) =>
                    setSignupData({ ...signupData, email: e.target.value })
                  }
                  className="w-full px-5 py-4 rounded-2xl bg-white/90 border border-white/40 outline-none text-slate-900 placeholder:text-slate-400"
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={signupData.password}
                  onChange={(e) =>
                    setSignupData({ ...signupData, password: e.target.value })
                  }
                  className="w-full px-5 py-4 rounded-2xl bg-white/90 border border-white/40 outline-none text-slate-900 placeholder:text-slate-400"
                />

                {error && (
                  <p className="text-red-300 text-sm font-semibold">{error}</p>
                )}

                <button
                  onClick={handleSignup}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-lg font-bold shadow-[0_16px_35px_rgba(59,130,246,0.35)] hover:scale-[1.02] transition-all"
                >
                  Create Account
                </button>
              </div>

              <p className="text-white/75 text-sm mt-6">
                Already have an account?{" "}
                <button
                  onClick={() => {
                    setMode("login");
                    setError("");
                  }}
                  className="text-cyan-300 font-bold"
                >
                  Login
                </button>
              </p>

              <button
                onClick={() => {
                  setMode("welcome");
                  setError("");
                }}
                className="text-white/55 text-sm mt-4"
              >
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