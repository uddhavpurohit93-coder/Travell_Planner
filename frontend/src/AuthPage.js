import { useState, useEffect } from "react";

const images = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80",
  //  "https://images.unsplash.com/photo-1681422570054-9ae5b8b03e46?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80"
];

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [bgIndex, setBgIndex] = useState(0);
  const [zoom, setZoom] = useState(1);

  // 🔥 Smooth background change + zoom
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % images.length);

      setZoom(1);
      setTimeout(() => setZoom(1.1), 50);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async () => {
    if (!email || !password || (!isLogin && !name)) {
      alert("Please fill all fields ❌");
      return;
    }

    try {
      setLoading(true);

      const url = isLogin
        ? "http://localhost:5000/api/login"
        : "http://localhost:5000/api/signup";

      const body = isLogin
        ? { email, password }
        : { name, email, password };

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });

      const text = await res.text();
      console.log("RAW RESPONSE:", text);

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        alert("Server error ❌ (Not JSON)");
        return;
      }

      console.log("PARSED:", data);

      // ✅ FIXED LOGIC
      if (res.ok && data.success) {

        // 🔐 LOGIN FLOW
        if (isLogin) {
          if (data.token) {
            localStorage.setItem("token", data.token);
            console.log("TOKEN SAVED:", data.token);
            window.location.reload();
          } else {
            alert("Login failed ❌");
          }
        }

        // ✨ SIGNUP FLOW (SMOOTH)
        else {
          // switch to login
          setIsLogin(true);

          // optional: clear fields
          setName("");
          setPassword("");

          // success message
          alert("Signup successful ✅ Please login");
        }

      } else {
        alert(data.message || "Something went wrong ❌");
      }

    } catch (err) {
      console.log(err);
      alert("Server error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full overflow-hidden flex items-center justify-center relative">

      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0">
        <img
          src={images[bgIndex]}
          className="w-full h-full object-cover transition-transform duration-[4000ms]"
          style={{ transform: `scale(${zoom})` }}
        />
      </div>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* LOGIN CARD */}
      <div className="relative z-10 bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md text-white border border-white/20 hover:shadow-purple-500/40 transition-all duration-500">

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-center mb-2 drop-shadow-lg">
          Travel Planner ✈️
        </h1>

        <h2 className="text-sm text-center mb-6 text-gray-200">
          {isLogin ? "Login to your account" : "Create your account"}
        </h2>

        {/* NAME */}
        {!isLogin && (
          <input
            className="w-full mb-3 p-2 rounded bg-white/20 placeholder-gray-200 outline-none"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
        )}

        {/* EMAIL */}
        <input
          className="w-full mb-3 p-2 rounded bg-white/20 placeholder-gray-200 outline-none"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />

        {/* PASSWORD */}
        <input
          type="password"
          className="w-full mb-4 p-2 rounded bg-white/20 placeholder-gray-200 outline-none"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-purple-500 text-white w-full py-2 rounded hover:bg-purple-600 transition shadow-lg hover:shadow-purple-400/50 disabled:opacity-60"
        >
          {loading ? "Please wait..." : isLogin ? "Login" : "Signup"}
        </button>

        {/* TOGGLE */}
        <p className="text-center mt-4 text-sm">
          {isLogin ? "New user?" : "Already have account?"}
          <span
            className="text-purple-300 cursor-pointer ml-2 hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Signup" : "Login"}
          </span>
        </p>

      </div>
    </div>
  );
}

export default AuthPage;