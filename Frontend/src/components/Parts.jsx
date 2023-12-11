import React from "react";
import { Link, useParams } from "react-router-dom";

function Parts() {
  const { makeId, modelId, partName } = useParams();

  return (
    <>
      <div className="flex justify-center h-full">
        <div className="mt-24 w-full">
          <div className="mt-8 mx-36 justify-start space-y-4">
            <Link to="../Cars" className="text-redText text-2xl font-semibold">
              Back
            </Link>
            <div className="flex flex-wrap">
              <button className="w-1/3 text-left shadow-[0_0px_20px_-10px_rgba(0,0,0,0.4)] font-bold text-greyHeader py-2 px-4 rounded-lg mb-4">
                <div className="items-center flex justify-between">
                  <span className="text-lg">Šarnyras</span>
                  <span className="text-redText text-xs">50 eur.</span>
                </div>
                <span className="text-sm font-normal text-opacity-80">
                  Engine: 3.0l
                </span>
                <br />
                <span className="text-sm font-normal text-opacity-80">
                  Power: 170kW
                </span>
                <br />
                <span className="text-sm font-normal text-opacity-80">
                  Mileage: 132658
                </span>
                <br />
                <span className="text-sm font-normal text-opacity-80">
                  Body: Sedan
                </span>
                <br />
                <span className="text-sm font-normal text-opacity-80">
                  Fuel: Diesel
                </span>
                <br />
                <span className="text-sm font-normal text-opacity-80">
                  Gearbox: Manual
                </span>
              </button>
              <button className="w-1/3 flex items-center justify-between shadow-[0_0px_20px_-10px_rgba(0,0,0,0.4)] font-bold text-greyHeader py-2 px-4 rounded-lg mb-4">
                <span>Vairo traukė</span>
                <span className="text-redText text-xs">365 Cars</span>
              </button>
              <button className="w-1/3 flex items-center justify-between shadow-[0_0px_20px_-10px_rgba(0,0,0,0.4)] font-bold text-greyHeader py-2 px-4 rounded-lg mb-4">
                <span>Galinis žibintas</span>
                <span className="text-redText text-xs">365 Cars</span>
              </button>
              <button className="w-1/3 flex items-center justify-between shadow-[0_0px_20px_-10px_rgba(0,0,0,0.4)] font-bold text-greyHeader py-2 px-4 rounded-lg mb-4">
                <span>Kapotas</span>
                <span className="text-redText text-xs">365 Cars</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Parts;
