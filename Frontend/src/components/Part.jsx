import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import axios from "axios";
import { IoIosArrowBack } from "react-icons/io";

function Part() {
  const { shopId, carId, partId } = useParams();
  const [part, setPart] = useState();
  const [isModalOpen, setModalOpen] = useState(false);

  const { authData, accessToken, isAdmin, login, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPartData = async () => {
      try {
        const response = await fetch(
          `https://localhost:7119/api/shops/${shopId}/cars/${carId}/parts/${partId}`
        );
        const data = await response.json();
        setPart(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPartData();
  }, []);

  const deletePart = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.delete(
        `https://localhost:7119/api/shops/${shopId}/Cars/${carId}/Parts/${partId}`,
        config
      );

      navigate(`/Car/${shopId}/${carId}`);
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
                to={`/Car/${shopId}/${carId}`}
                className="text-redText text-2xl font-semibold flex items-center space-x-2"
              >
                <IoIosArrowBack />
                <span>Back</span>
              </Link>
              {part && (
                <span className="text-greyHeader text-2xl font-semibold">
                  {part.name} - {part.price} eur.
                </span>
              )}
              {(authData && part && authData.id == part.car.shop.user.id) ||
              isAdmin ? (
                <div className="space-x-2">
                  <Link
                    className="border text-sm py-2 px-6 rounded-lg text-white bg-redText font-semibold justify-center"
                    to={`/EditPart/${shopId}/${carId}/${partId}`}
                  >
                    Edit Part
                  </Link>
                  <Link
                    className="border text-sm py-2 px-6 rounded-lg text-white bg-redText font-semibold justify-center"
                    onClick={() => setModalOpen(true)}
                  >
                    Delete Part
                  </Link>
                </div>
              ) : (
                <span className="text-redText text-opacity-0 text-2xl font-semibold">
                  Back
                </span>
              )}
            </div>
            <div className="flex">
              {part ? (
                <div className="w-1/3 text-left font-bold text-greyHeader py-2 rounded-lg mb-4">
                  <div className="items-center flex justify-between">
                    <span className="text-lg">
                      {part.car.make} {part.car.model}
                    </span>
                  </div>
                  <span className="text-sm font-normal text-opacity-80">
                    First Registration:{" "}
                    {part.car.firstRegistration.split("T")[0]}
                  </span>
                  <br />
                  <span className="text-sm font-normal text-opacity-80">
                    Engine: {part.car.engine}
                  </span>
                  <br />
                  <span className="text-sm font-normal text-opacity-80">
                    Power: {part.car.power}
                  </span>
                  <br />
                  <span className="text-sm font-normal text-opacity-80">
                    Mileage: {part.car.mileage}
                  </span>
                  <br />
                  <span className="text-sm font-normal text-opacity-80">
                    Body: {part.car.body}
                  </span>
                  <br />
                  <span className="text-sm font-normal text-opacity-80">
                    Fuel: {part.car.fuel}
                  </span>
                  <br />
                  <span className="text-sm font-normal text-opacity-80">
                    Gearbox: {part.car.gearbox}
                  </span>
                </div>
              ) : null}

              {part ? (
                <div className="w-1/3 text-left font-bold text-greyHeader py-2 rounded-lg mb-4">
                  <div className="items-center flex justify-between">
                    <span className="text-lg">{part.car.shop.name}</span>
                  </div>
                  <span className="text-sm font-normal text-opacity-80">
                    Location: {part.car.shop.location}
                  </span>
                  <br />
                  <span className="text-sm font-normal text-opacity-80">
                    Contact: {part.car.shop.user.firstname},{" "}
                    {part.car.shop.user.phoneNumber}
                  </span>
                </div>
              ) : null}

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
                      onClick={deletePart}
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
      </div>
    </>
  );
}

export default Part;
