import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthProvider";
import { IoIosArrowBack } from "react-icons/io";

function CreateShop() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const { userData, accessToken, login, logout } = useAuth();

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlePost = async () => {
    if (!name || !location) {
      setError("Please fill in all fields");
      return;
    }

    setError("");

    try {
      const postData = {
        Name: name,
        Location: location,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      };

      await axios.post("https://localhost:7119/api/shops", postData, config);

      navigate("/Shops");
    } catch (error) {
      console.error("Error fetching data:", error);

      if (error.response.status == 409) {
        setError("Shop with that name already exists");
      } else if (error.response.status == 400) {
        setError("Invalid input");
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <>
      <div className="flex justify-center h-full">
        <div className="mt-24 w-full">
          <div className="mt-8 mx-36 justify-start space-y-4">
            <div className="justify-between flex">
              <Link
                to={`/Shops`}
                className="text-redText text-2xl font-semibold flex items-center"
              >
                <IoIosArrowBack className="mr-2" />
                Back
              </Link>
              <span className="text-greyHeader text-2xl font-semibold">
                Create Shop
              </span>
              <span className="text-redText text-opacity-0 text-2xl font-semibold">
                Back
              </span>
            </div>
            <div className="space-y-4">
              <div className="text-left">
                <p className="ml-2 text-greyHeader text-opacity-80 font-semibold text-sm">
                  Name
                </p>
                <input
                  type="text"
                  value={name}
                  className="w-full rounded-lg pl-4 py-2 text-sm border-2 border-greyHeader border-opacity-80 text-greyHeader text-opacity-80 font-semibold"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="text-left">
                <p className="ml-2 text-greyHeader text-opacity-80 font-semibold text-sm">
                  Location
                </p>
                <input
                  type="text"
                  value={location}
                  className="w-full rounded-lg pl-4 py-2 text-sm border-2 border-greyHeader border-opacity-80 text-greyHeader text-opacity-80 font-semibold"
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <button
                onClick={handlePost}
                className="border text-sm py-2 rounded-lg text-white bg-redText font-semibold flex w-full justify-center"
              >
                Create
              </button>
              {error ? (
                <p className="mt-2 text-redText text-opacity-80 font-semibold text-sm">
                  {error}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateShop;
