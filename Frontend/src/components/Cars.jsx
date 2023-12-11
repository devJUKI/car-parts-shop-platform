import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Cars() {
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);

  const [selectedMake, setSelectedMake] = useState(-1);

  const fetchData = async (url, setData) => {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData("https://localhost:7119/api/cardata/makes", setMakes);
  }, []);

  const changeHandler = (e) => setSelectedMake(e.target.value);

  useEffect(() => {
    const modelsEndpoint = `https://localhost:7119/api/cardata/models?makeId=${selectedMake}`;
    fetchData(modelsEndpoint, setModels);
  }, [selectedMake]);

  return (
    <>
      <div className="flex justify-center h-full">
        <div className="mt-24 w-full">
          {/* Inputs */}
          <div className="space-x-4 flex justify-center">
            <select
              onChange={changeHandler}
              className="w-48 rounded-lg py-2 pl-3 pr-12 text-sm border-2 border-greyHeader border-opacity-80 text-greyHeader text-opacity-80 font-semibold"
            >
              <option value={-1}>Choose make</option>
              {makes.map((make) => (
                <option key={make.id} value={make.id}>
                  {make.name}
                </option>
              ))}
            </select>
            <select className="w-48 rounded-lg py-2 pl-3 pr-12 text-sm border-2 border-greyHeader border-opacity-80 text-greyHeader text-opacity-80 font-semibold">
              <option value={-1}>Choose model</option>
              {models.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.name}
                </option>
              ))}
            </select>
            <Link
              to="../Parts"
              className="bg-redText rounded-lg px-3 text-white flex items-center"
            >
              X
            </Link>
          </div>
          {/* Make Buttons*/}
          <div className="mt-8 mx-36 justify-start space-y-4">
            <span className="text-redText text-2xl font-semibold">
              Most Popular
            </span>
            <div className="flex flex-wrap">
              <button className="w-1/3 flex items-center justify-between shadow-[0_0px_20px_-10px_rgba(0,0,0,0.4)] font-bold text-greyHeader py-2 px-4 rounded-lg mb-4">
                <span>BMW 530d</span>
                <span className="text-redText text-xs">365 Cars</span>
              </button>
              <button className="w-1/3 flex items-center justify-between shadow-[0_0px_20px_-10px_rgba(0,0,0,0.4)] font-bold text-greyHeader py-2 px-4 rounded-lg mb-4">
                <span>BMW X5</span>
                <span className="text-redText text-xs">365 Cars</span>
              </button>
              <button className="w-1/3 flex items-center justify-between shadow-[0_0px_20px_-10px_rgba(0,0,0,0.4)] font-bold text-greyHeader py-2 px-4 rounded-lg mb-4">
                <span>Mercedes-Benz C63</span>
                <span className="text-redText text-xs">365 Cars</span>
              </button>
              <button className="w-1/3 flex items-center justify-between shadow-[0_0px_20px_-10px_rgba(0,0,0,0.4)] font-bold text-greyHeader py-2 px-4 rounded-lg mb-4">
                <span>Porsche Carrera GT</span>
                <span className="text-redText text-xs">365 Cars</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cars;
