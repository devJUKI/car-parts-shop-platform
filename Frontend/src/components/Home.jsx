import React, { useEffect, useState } from "react";
import Background from "../assets/background.png";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

function Home() {
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);

  const [selectedMake, setSelectedMake] = useState(-1);
  const [selectedModel, setSelectedModel] = useState(-1);
  const [selectedPart, setSelectedPart] = useState("");

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

  const makeChangeHandler = (e) => setSelectedMake(e.target.value);
  const modelChangeHandler = (e) => setSelectedModel(e.target.value);

  useEffect(() => {
    const modelsEndpoint = `https://localhost:7119/api/cardata/models?makeId=${selectedMake}`;
    fetchData(modelsEndpoint, setModels);
  }, [selectedMake]);

  const constructPartUrl = () => {
    let url = "/Parts";

    if (selectedMake == -1) {
      return url;
    }

    url += "/" + selectedMake;

    if (selectedModel == -1) {
      return url;
    }

    url += "/" + selectedModel;

    if (selectedPart == "") {
      return url;
    }

    url += "/" + selectedPart;
    return url;
  };

  return (
    <>
      <div className="flex absolute h-full">
        <div className="flex items-center">
          <div className="bg-greyBody h-full items-center flex flex-1">
            {/* shadow-[rgba(0,0,15,0.25)_4px_0px_4px_2px] */}
            <div className="mx-36 space-y-12">
              <div className="text-4xl text-greyHeader font-bold">
                Keep your <span className="text-redText">car </span> intact, buy
                from your <span className="text-redText">favorite </span>
                sellers
              </div>
              <div className="space-y-3">
                {/* <select
                  onChange={makeChangeHandler}
                  className="w-full rounded-lg py-2 pl-3 text-sm border-2 border-greyHeader border-opacity-80 text-greyHeader text-opacity-80 font-semibold"
                >
                  <option value={-1}>Choose make</option>
                  {makes.map((make) => (
                    <option key={make.id} value={make.id}>
                      {make.name}
                    </option>
                  ))}
                </select>
                <select
                  onChange={modelChangeHandler}
                  disabled={selectedMake == -1}
                  className="w-full rounded-lg py-2 pl-3 text-sm border-2 border-greyHeader border-opacity-80 text-greyHeader text-opacity-80 font-semibold"
                >
                  <option value={-1}>Choose model</option>
                  {models.map((model) => (
                    <option key={model.id} value={model.id}>
                      {model.name}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  disabled={selectedModel == -1}
                  defaultValue="Enter part name"
                  className="w-full rounded-lg pl-4 py-2 text-sm border-2 border-greyHeader border-opacity-80 text-greyHeader text-opacity-80 font-semibold"
                  onFocus={(e) => {
                    if (e.target.value === "Enter part name") {
                      e.target.value = "";
                    }
                  }}
                  onBlur={(e) => {
                    if (e.target.value === "") {
                      e.target.value = "Enter part name";
                    }
                  }}
                  onChange={(e) => {
                    setSelectedPart(e.target.value);
                  }}
                /> */}
                <Link
                  disabled={selectedPart == ""}
                  to={"/Shops"}
                  className="border text-sm py-2 rounded-lg text-white bg-redText font-semibold flex w-full justify-center"
                >
                  <div className="space-x-2 flex items-center">
                    <span>Search</span>
                    <FaSearch />
                  </div>
                </Link>
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

export default Home;
