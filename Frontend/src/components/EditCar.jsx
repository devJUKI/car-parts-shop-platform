import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthProvider";
import { IoIosArrowBack } from "react-icons/io";

function EditCar() {
  const navigate = useNavigate();
  const { shopId, carId } = useParams();
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [bodies, setBodies] = useState([]);
  const [fuels, setFuels] = useState([]);
  const [gearboxes, setGearboxes] = useState([]);
  const { userData, accessToken, login, logout } = useAuth();

  const [selectedMake, setSelectedMake] = useState(-1);
  const [selectedModel, setSelectedModel] = useState(-1);
  const [firstRegistration, setFirstRegistration] = useState(
    new Date().toISOString().substring(0, 10)
  );
  const [mileage, setMileage] = useState("");
  const [engine, setEngine] = useState("");
  const [power, setPower] = useState("");
  const [bodyTypeId, setBodyTypeId] = useState(-1);
  const [fuelTypeId, setFuelTypeId] = useState(-1);
  const [gearboxTypeId, setGearboxTypeId] = useState(-1);

  const [error, setError] = useState("");

  useEffect(() => {
    fetchData("https://localhost:7119/api/cardata/makes", setMakes);
    fetchData("https://localhost:7119/api/cardata/fuels", setFuels);
    fetchData("https://localhost:7119/api/cardata/bodies", setBodies);
    fetchData("https://localhost:7119/api/cardata/gearboxes", setGearboxes);
  }, []);

  useEffect(() => {
    const modelsEndpoint = `https://localhost:7119/api/cardata/models?makeId=${selectedMake}`;
    fetchData(modelsEndpoint, setModels);
  }, [selectedMake]);

  const fetchData = async (url, setData) => {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePut = async () => {
    if (
      selectedMake == -1 ||
      selectedModel == -1 ||
      !mileage ||
      !engine ||
      !power ||
      bodyTypeId == -1 ||
      fuelTypeId == -1 ||
      gearboxTypeId == -1
    ) {
      setError("Please fill in all fields correctly");
      return;
    }

    setError("");

    try {
      const putData = {
        id: carId,
        firstRegistration: firstRegistration,
        mileage: mileage,
        engine: engine,
        power: power,
        bodyTypeId: bodyTypeId,
        fuelTypeId: fuelTypeId,
        gearboxTypeId: gearboxTypeId,
        modelId: selectedModel,
        shopId: shopId,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      };

      await axios.put(
        `https://localhost:7119/api/shops/${shopId}/Cars/${carId}`,
        putData,
        config
      );

      navigate(`/Car/${shopId}/${carId}`);
    } catch (error) {
      console.error("Error fetching data:", error);

      if (error.response.status == 400) {
        setError("Invalid data");
      } else if (error.response.status == 403) {
        setError("Your authentication token is expired, log in again");
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
                to={`/Car/${shopId}/${carId}`}
                className="text-redText text-2xl font-semibold flex items-center"
              >
                <IoIosArrowBack className="mr-2" />
                Back
              </Link>
              <span className="text-greyHeader text-2xl font-semibold">
                Edit Car
              </span>
              <span className="text-redText text-opacity-0 text-2xl font-semibold">
                Back
              </span>
            </div>
            <div className="space-y-4 flex flex-wrap">
              <div className="flex w-full space-x-4">
                <div className="text-left w-1/2">
                  <p className="ml-2 text-greyHeader text-opacity-80 font-semibold text-sm">
                    Name
                  </p>
                  <select
                    className="w-full rounded-lg pl-4 py-2 text-sm border-2 border-greyHeader border-opacity-80 text-greyHeader text-opacity-80 font-semibold"
                    value={selectedMake}
                    onChange={(e) => {
                      setSelectedMake(e.target.value);
                    }}
                  >
                    <option value={-1}>Choose make</option>
                    {makes.map((make) => (
                      <option key={make.id} value={make.id}>
                        {make.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="text-left w-1/2">
                  <p className="ml-2 text-greyHeader text-opacity-80 font-semibold text-sm">
                    Name
                  </p>
                  <select
                    className="w-full rounded-lg pl-4 py-2 text-sm border-2 border-greyHeader border-opacity-80 text-greyHeader text-opacity-80 font-semibold"
                    value={selectedModel}
                    onChange={(e) => {
                      setSelectedModel(e.target.value);
                    }}
                  >
                    <option value={-1}>Choose model</option>
                    {models.map((model) => (
                      <option key={model.id} value={model.id}>
                        {model.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex w-full space-x-4">
                <div className="text-left w-1/2">
                  <p className="ml-2 text-greyHeader text-opacity-80 font-semibold text-sm">
                    First registration
                  </p>
                  <input
                    type="date"
                    value={firstRegistration}
                    className="w-full rounded-lg pl-4 py-2 text-sm border-2 border-greyHeader border-opacity-80 text-greyHeader text-opacity-80 font-semibold"
                    onChange={(e) => setFirstRegistration(e.target.value)}
                  />
                </div>
                <div className="text-left w-1/2">
                  <p className="ml-2 text-greyHeader text-opacity-80 font-semibold text-sm">
                    Mileage
                  </p>
                  <input
                    type="text"
                    value={mileage}
                    className="w-full rounded-lg pl-4 py-2 text-sm border-2 border-greyHeader border-opacity-80 text-greyHeader text-opacity-80 font-semibold"
                    onChange={(e) => setMileage(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex w-full space-x-4">
                <div className="text-left w-1/2">
                  <p className="ml-2 text-greyHeader text-opacity-80 font-semibold text-sm">
                    Engine
                  </p>
                  <input
                    type="text"
                    value={engine}
                    className="w-full rounded-lg pl-4 py-2 text-sm border-2 border-greyHeader border-opacity-80 text-greyHeader text-opacity-80 font-semibold"
                    onChange={(e) => setEngine(e.target.value)}
                  />
                </div>
                <div className="text-left w-1/2">
                  <p className="ml-2 text-greyHeader text-opacity-80 font-semibold text-sm">
                    Power
                  </p>
                  <input
                    type="text"
                    value={power}
                    className="w-full rounded-lg pl-4 py-2 text-sm border-2 border-greyHeader border-opacity-80 text-greyHeader text-opacity-80 font-semibold"
                    onChange={(e) => setPower(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex w-full space-x-4">
                <div className="text-left w-1/2">
                  <p className="ml-2 text-greyHeader text-opacity-80 font-semibold text-sm">
                    Body Type
                  </p>
                  <select
                    className="w-full rounded-lg pl-4 py-2 text-sm border-2 border-greyHeader border-opacity-80 text-greyHeader text-opacity-80 font-semibold"
                    onChange={(e) => {
                      setBodyTypeId(e.target.value);
                    }}
                  >
                    <option value={-1}>Choose body</option>
                    {bodies.map((body) => (
                      <option key={body.id} value={body.id}>
                        {body.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="text-left w-1/2">
                  <p className="ml-2 text-greyHeader text-opacity-80 font-semibold text-sm">
                    Fuel Type
                  </p>
                  <select
                    className="w-full rounded-lg pl-4 py-2 text-sm border-2 border-greyHeader border-opacity-80 text-greyHeader text-opacity-80 font-semibold"
                    onChange={(e) => {
                      setFuelTypeId(e.target.value);
                    }}
                  >
                    <option value={-1}>Choose fuel</option>
                    {fuels.map((fuel) => (
                      <option key={fuel.id} value={fuel.id}>
                        {fuel.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="text-left w-full">
                <p className="ml-2 text-greyHeader text-opacity-80 font-semibold text-sm">
                  Gearbox Type
                </p>
                <select
                  className="w-full rounded-lg pl-4 py-2 text-sm border-2 border-greyHeader border-opacity-80 text-greyHeader text-opacity-80 font-semibold"
                  onChange={(e) => {
                    setGearboxTypeId(e.target.value);
                  }}
                >
                  <option value={-1}>Choose gearbox</option>
                  {gearboxes.map((gearbox) => (
                    <option key={gearbox.id} value={gearbox.id}>
                      {gearbox.name}
                    </option>
                  ))}
                </select>
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

export default EditCar;
