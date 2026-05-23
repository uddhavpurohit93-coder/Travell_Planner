import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("travelUser", "true");
    navigate("/home");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-[32px] p-8 shadow-[0_25px_70px_rgba(15,23,42,0.12)]">
        <h2 className="text-4xl font-black text-slate-900">
          Welcome Back 👋
        </h2>

        <p className="text-slate-500 mt-3">
          Login to continue your travel journey.
        </p>

        <div className="mt-8 space-y-5">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:border-cyan-400"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:border-cyan-400"
          />

          <button
            onClick={handleLogin}
            className="w-full p-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold shadow-lg hover:scale-[1.02] transition-all"
          >
            Login
          </button>

          <p className="text-center text-slate-500 text-sm">
            Don&apos;t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-cyan-500 font-bold cursor-pointer"
            >
              Signup
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;