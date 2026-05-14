import { useNavigate } from "react-router-dom";

function Signup() {

  const navigate =
    useNavigate();

  const handleSignup = () => {

    navigate("/home")
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

          Create Account 🚀

        </h2>

        <p className="
          text-gray-400
          mt-4 text-lg
        ">

          Start planning luxury
          AI-powered trips.

        </p>

        <div className="
          mt-10 space-y-6
        ">

          <input
            type="text"
            placeholder="Username"
            className="
              w-full p-5
              rounded-2xl
              bg-[#071120]
              border border-white/10
              outline-none
            "
          />

          <input
            type="email"
            placeholder="Email Address"
            className="
              w-full p-5
              rounded-2xl
              bg-[#071120]
              border border-white/10
              outline-none
            "
          />

          <input
            type="text"
            placeholder="Contact Number"
            className="
              w-full p-5
              rounded-2xl
              bg-[#071120]
              border border-white/10
              outline-none
            "
          />

          <button
            onClick={handleSignup}
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

            Create Account

          </button>

        </div>

      </div>

    </div>
  );
}

export default Signup;