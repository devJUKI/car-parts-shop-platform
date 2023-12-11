import { useState } from "react";
import Background from "../assets/background.png";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useAuth } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const { authData, accessToken, login, logout } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setError("");

    try {
      // Make an HTTP POST request to your server with the email and password
      const response = await Axios.post("https://localhost:7119/api/Login", {
        email: email,
        password: password,
      });

      // Handle the server response as needed
      console.log(response.data); // You may want to do something more meaningful here

      login(response.data.accessToken);

      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);

      if (error.response.status == 400) {
        setError("Invalid credentials");
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <>
      <div className="flex absolute h-full">
        <div className="flex items-center">
          <div className="bg-greyBody h-full items-center flex flex-1">
            {/* shadow-[rgba(0,0,15,0.25)_4px_0px_4px_2px] */}
            <div className="mx-36 space-y-12">
              <div className="text-4xl text-greyHeader font-bold">
                Join <span className="text-redText">thousands </span> of
                <span className="text-redText"> sellers</span> from around the
                world
              </div>
              <div className="text-center">
                <div className="space-y-3">
                  <div className="text-left">
                    <p className="ml-2 text-greyHeader text-opacity-80 font-semibold text-sm">
                      Email
                    </p>
                    <input
                      type="text"
                      value={email}
                      className="w-full rounded-lg pl-4 py-2 text-sm border-2 border-greyHeader border-opacity-80 text-greyHeader text-opacity-80 font-semibold"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="text-left">
                    <p className="ml-2 text-greyHeader text-opacity-80 font-semibold text-sm">
                      Password
                    </p>
                    <input
                      type="password"
                      value={password}
                      className="w-full rounded-lg pl-4 py-2 text-sm border-2 border-greyHeader border-opacity-80 text-greyHeader text-opacity-80 font-semibold"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button
                    onClick={handleLogin}
                    className="border w-full text-sm py-2 rounded-lg text-white bg-redText font-semibold"
                  >
                    Continue
                  </button>
                </div>
                {error ? (
                  <p className="mt-2 text-redText text-opacity-80 font-semibold text-sm">
                    {error}
                  </p>
                ) : null}
                <p className="mt-2 text-greyHeader text-opacity-80 font-semibold text-xs">
                  Don't have an account?{" "}
                  <Link to="../Register" className="text-greyHeader">
                    Register
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-2 h-full bg-red-200">
            <img src={Background} className="object-cover max-w-5xl" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
