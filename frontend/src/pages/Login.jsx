import { useNavigate } from "react-router-dom";

function Login() {

  const navigate =
    useNavigate();

  const handleLogin = () => {

    navigate("/");

  };

  return (

    <div className="
      min-h-screen
      bg-[#071120]
      flex items-center
      justify-center
      px-6
    ">

      <div className="
        w-full max-w-lg
        bg-[#101826]
        border border-white/10
        rounded-[40px]
        p-10
        text-white
      ">

        <h2 className="
          text-5xl font-bold
        ">

          Welcome Back 👋

        </h2>

        <p className="
          text-gray-400
          mt-4 text-lg
        ">

          Login to continue your
          AI travel journey.

        </p>

        <div className="
          mt-10 space-y-6
        ">

          <input
            type="text"
            placeholder="Email or Contact"
            className="
              w-full p-5
              rounded-2xl
              bg-[#071120]
              border border-white/10
              outline-none
            "
          />

          <button
            onClick={handleLogin}
            className="
              w-full p-5
              rounded-2xl
              bg-gradient-to-r
              from-cyan-500
              to-blue-500
              text-lg font-semibold
              hover:scale-[1.02]
              transition-all
            "
          >

            Login

          </button>

        </div>

      </div>

    </div>
  );
}

export default Login;