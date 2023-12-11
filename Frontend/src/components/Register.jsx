import { useState } from "react";
import Background from "../assets/background.png";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useAuth } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const { authData, accessToken, login, logout } = useAuth();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showSecondStep, setShowSecondStep] = useState(false);

  const [error, setError] = useState("");

  const firstStep = () => {
    return (
      <>
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
          <div className="text-left">
            <p className="ml-2 text-greyHeader text-opacity-80 font-semibold text-sm">
              Repeat password
            </p>
            <input
              type="password"
              value={repeatPassword}
              className="w-full rounded-lg pl-4 py-2 text-sm border-2 border-greyHeader border-opacity-80 text-greyHeader text-opacity-80 font-semibold"
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </div>
          <button
            onClick={handleFirstStep}
            className="border w-full text-sm py-2 rounded-lg text-white bg-redText font-semibold"
          >
            Continue
          </button>
        </div>
      </>
    );
  };

  const secondStep = () => {
    return (
      <>
        <div className="space-y-3">
          <div className="text-left">
            <p className="ml-2 text-greyHeader text-opacity-80 font-semibold text-sm">
              First name
            </p>
            <input
              type="text"
              value={firstname}
              className="w-full rounded-lg pl-4 py-2 text-sm border-2 border-greyHeader border-opacity-80 text-greyHeader text-opacity-80 font-semibold"
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>
          <div className="text-left">
            <p className="ml-2 text-greyHeader text-opacity-80 font-semibold text-sm">
              Last name
            </p>
            <input
              type="text"
              value={lastname}
              className="w-full rounded-lg pl-4 py-2 text-sm border-2 border-greyHeader border-opacity-80 text-greyHeader text-opacity-80 font-semibold"
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <div className="text-left">
            <p className="ml-2 text-greyHeader text-opacity-80 font-semibold text-sm">
              Phone number
            </p>
            <input
              type="text"
              value={phoneNumber}
              className="w-full rounded-lg pl-4 py-2 text-sm border-2 border-greyHeader border-opacity-80 text-greyHeader text-opacity-80 font-semibold"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleBack}
              className="w-1/3 border-2 border-redText text-sm py-2 rounded-lg text-redText bg-white font-semibold"
            >
              Back
            </button>
            <button
              onClick={handleRegistration}
              className="border w-full text-sm py-2 rounded-lg text-white bg-redText font-semibold"
            >
              Complete registration
            </button>
          </div>
        </div>
      </>
    );
  };

  const handleBack = () => {
    setShowSecondStep(false);
  };

  const handleRegistration = async () => {
    if (!firstname || !lastname || !phoneNumber) {
      setError("Please fill in all fields");
      return;
    }

    setError("");

    try {
      // Make an HTTP POST request to your server with the email and password
      const response = await Axios.post("https://localhost:7119/api/Register", {
        firstname: firstname,
        lastname: lastname,
        phoneNumber: phoneNumber,
        email: email,
        password: password,
      });

      // Handle the server response as needed
      console.log(response.data); // You may want to do something more meaningful here

      login(response.data.accessToken);

      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);

      if (error.response.status == 409) {
        setError("User with that email already exists");
      } else if (error.response.status == 400) {
        setError("Invalid input");
      } else {
        setError(error.message);
      }
    }
  };

  const handleFirstStep = () => {
    if (!email || !password || !repeatPassword) {
      setError("Please fill in all fields");
      return;
    }

    setError("");
    setShowSecondStep(true);
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
                {showSecondStep ? secondStep() : firstStep()}
                {error ? (
                  <p className="mt-2 text-redText text-opacity-80 font-semibold text-sm">
                    {error}
                  </p>
                ) : null}
                <p className="mt-2 text-greyHeader text-opacity-80 font-semibold text-xs">
                  Already have an account?{" "}
                  <Link to="../Login" className="text-greyHeader">
                    Login
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
