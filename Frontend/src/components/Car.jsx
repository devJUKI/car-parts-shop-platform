import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import axios from "axios";
import { IoIosArrowBack } from "react-icons/io";

function Car() {
  const { shopId, carId } = useParams();
  const [parts, setParts] = useState([]);
  const [car, setCar] = useState();
  const [isModalOpen, setModalOpen] = useState(false);

  const { authData, accessToken, isAdmin, login, logout } = useAuth();
  const navigate = useNavigate();

  const fetchPartsData = async () => {
    try {
      const response = await fetch(
        `https://localhost:7119/api/shops/${shopId}/cars/${carId}/parts`
      );
      const data = await response.json();
      setParts(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await fetch(
          `https://localhost:7119/api/shops/${shopId}/cars/${carId}`
        );
        const data = await response.json();
        setCar(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPartsData();
    fetchCarData();
  }, []);

  const deleteCar = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.delete(
        `https://localhost:7119/api/shops/${shopId}/Cars/${carId}`,
        config
      );
      navigate(`/Shop/${shopId}`);
    } catch (error) {
      console.error(`Error deleting car ${carId}:`, error);
    }
  };

  return (
    <>
      <div className="flex justify-center h-full">
        <div className="mt-24 w-full">
          <div className="mt-8 mx-36 justify-start space-y-4">
            <div className="justify-between flex">
              <Link
                to={`/Shop/${shopId}`}
                className="text-redText text-2xl font-semibold flex items-center space-x-2"
              >
                <IoIosArrowBack />
                <span>Back</span>
              </Link>
              {car && (
                <span className="text-greyHeader text-2xl font-semibold">
                  {car.make} {car.model}
                </span>
              )}
              {(authData && car && authData.id == car.shop.user.id) ||
              isAdmin ? (
                <div className="space-x-2">
                  <Link
                    className="border text-sm py-2 px-6 rounded-lg text-white bg-redText font-semibold justify-center"
                    to={`/EditCar/${shopId}/${carId}`}
                  >
                    Edit Car
                  </Link>
                  <Link
                    className="border text-sm py-2 px-6 rounded-lg text-white bg-redText font-semibold justify-center"
                    onClick={() => setModalOpen(true)}
                  >
                    Delete Car
                  </Link>
                  <Link
                    className="border text-sm py-2 px-6 rounded-lg text-white bg-redText font-semibold justify-center"
                    to={`/CreatePart/${shopId}/${carId}`}
                  >
                    Add Part
                  </Link>
                </div>
              ) : (
                <span className="text-redText text-opacity-0 text-2xl font-semibold">
                  Back
                </span>
              )}
            </div>
            <div className="flex flex-wrap">
              {parts.map((part) => {
                return (
                  <Link
                    key={part.id}
                    to={`/Part/${shopId}/${carId}/${part.id}`}
                    className="w-1/3 text-left shadow-[0_0px_20px_-10px_rgba(0,0,0,0.4)] font-bold text-greyHeader py-2 px-4 rounded-lg mb-4"
                  >
                    <div className="items-center flex justify-between">
                      <span className="text-lg">{part.name}</span>
                      <span className="text-redText text-xs">
                        {part.price} eur.
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
            {isModalOpen ? (
              <div className="bg-white border-redText border-0 items-center justify-between shadow-[0_0px_20px_-10px_rgba(0,0,0,0.4)] absolute top-72 left-0 right-0 ml-auto mr-auto w-1/3 font-bold text-greyHeader py-4 px-4 rounded-lg">
                <h1>Are you sure you want to delete?</h1>
                <div className="flex mt-4 space-x-2">
                  <button
                    onClick={() => setModalOpen(false)}
                    className="grow border text-sm py-2 px-6 rounded-lg text-white bg-redText font-semibold justify-center"
                  >
                    No
                  </button>
                  <button
                    onClick={deleteCar}
                    className="grow border text-sm py-2 px-6 rounded-lg text-white bg-redText font-semibold justify-center"
                  >
                    Yes
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default Car;
