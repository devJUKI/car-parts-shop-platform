import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthProvider";
import { IoIosArrowBack } from "react-icons/io";

function EditPart() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const { userData, accessToken, login, logout } = useAuth();

  const [error, setError] = useState("");
  const { shopId, carId, partId } = useParams();
  const navigate = useNavigate();

  const handlePut = async () => {
    if (!name || !price) {
      setError("Please fill in all fields");
      return;
    }

    setError("");

    try {
      const postData = {
        Id: partId,
        Name: name,
        Price: price,
        CarId: carId,
        ShopId: shopId,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      };

      await axios.put(
        `https://localhost:7119/api/shops/${shopId}/Cars/${carId}/Parts/${partId}`,
        postData,
        config
      );

      navigate(`/Part/${shopId}/${carId}/${partId}`);
    } catch (error) {
      console.error("Error fetching data:", error);

      if (error.response.status == 403) {
        setError("Your authorization token expired, log in again");
      } else if (error.response.status == 400) {
        setError("Invalid input");
      } else if (error.response.status == 404) {
        setError("Specified car was not found");
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
                to={`/Part/${shopId}/${carId}/${partId}`}
                className="text-redText text-2xl font-semibold flex items-center"
              >
                <IoIosArrowBack className="mr-2" />
                Back
              </Link>
              <span className="text-greyHeader text-2xl font-semibold">
                Edit Part
              </span>
              <span className="text-redText text-opacity-0 text-2xl font-semibold">
                Back
              </span>
            </div>
            <div className="space-y-4">
              <div className="text-left">
                <p className="ml-2 text-greyHeader text-opacity-80 font-semibold text-sm">
                  Part name
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
                  Part price
                </p>
                <input
                  type="text"
                  value={price}
                  className="w-full rounded-lg pl-4 py-2 text-sm border-2 border-greyHeader border-opacity-80 text-greyHeader text-opacity-80 font-semibold"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <button
                onClick={handlePut}
                className="border text-sm py-2 rounded-lg text-white bg-redText font-semibold flex w-full justify-center"
              >
                Submit
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

export default EditPart;
