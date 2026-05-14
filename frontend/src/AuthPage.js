import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AuthPage() {

  const navigate = useNavigate();

  const [isSignup, setIsSignup] =
    useState(false);

  const [formData, setFormData] =
    useState({
      username: "",
      email: "",
      contact: ""
    });

  const handleSubmit = () => {

    localStorage.setItem(
      "travelUser",
      JSON.stringify(formData)
    );

    navigate("/home");
  };

  return (

    <div className="
      min-h-screen
      flex items-center justify-center
      bg-[#061223]
      text-white
    ">

      <div className="
        w-full max-w-md
        bg-[#0f172a]
        p-10 rounded-3xl
        border border-white/10
      ">

        <h1 className="
          text-4xl font-bold
          mb-8 text-center
        ">

          {
            isSignup
              ? "Create Account"
              : "Welcome Back"
          }

        </h1>

        {isSignup && (

          <input
            type="text"
            placeholder="Username"
            className="
              w-full p-4 mb-4
              rounded-2xl
              bg-[#091120]
              border border-white/10
            "
            onChange={(e) =>
              setFormData({
                ...formData,
                username: e.target.value
              })
            }
          />

        )}

        <input
          type="email"
          placeholder="Email"
          className="
            w-full p-4 mb-4
            rounded-2xl
            bg-[#091120]
            border border-white/10
          "
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value
            })
          }
        />

        <input
          type="text"
          placeholder="Contact"
          className="
            w-full p-4 mb-6
            rounded-2xl
            bg-[#091120]
            border border-white/10
          "
          onChange={(e) =>
            setFormData({
              ...formData,
              contact: e.target.value
            })
          }
        />

        <button
          onClick={handleSubmit}
          className="
            w-full p-4
            rounded-2xl
            bg-gradient-to-r
            from-cyan-500
            to-blue-500
            font-bold
          "
        >

          {
            isSignup
              ? "Sign Up"
              : "Login"
          }

        </button>

        <p
          onClick={() =>
            setIsSignup(!isSignup)
          }
          className="
            mt-6 text-center
            text-cyan-400
            cursor-pointer
          "
        >

          {
            isSignup
              ? "Already have account? Login"
              : "Create new account"
          }

        </p>

      </div>

    </div>
  );
}

export default AuthPage;