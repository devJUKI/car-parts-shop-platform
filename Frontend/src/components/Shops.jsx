import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

function Shops() {
  const [shops, setShops] = useState([]);
  const { authData, accessToken, login, logout } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://localhost:7119/api/shops");
        const data = await response.json();
        setShops(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex justify-center h-full">
        <div className="mt-24 w-full">
          <div className="mt-8 mx-36 justify-start space-y-4">
            <div className="justify-between flex">
              <span className="text-redText text-opacity-0 text-2xl font-semibold">
                Back
              </span>
              <span className="text-greyHeader text-2xl font-semibold">
                Shops
              </span>
              {authData ? (
                <Link
                  className="border text-sm py-2 px-6 rounded-lg text-white bg-redText font-semibold justify-center"
                  to={"/CreateShop"}
                >
                  Create Shop
                </Link>
              ) : (
                <span className="text-redText text-opacity-0 text-2xl font-semibold">
                  Back
                </span>
              )}
            </div>
            <div className="flex flex-wrap">
              {shops.map((shop) => (
                <Link
                  key={shop.id}
                  to={`/Shop/${shop.id}`}
                  className="w-1/3 flex items-center justify-between shadow-[0_0px_20px_-10px_rgba(0,0,0,0.4)] font-bold text-greyHeader py-2 px-4 rounded-lg mb-4"
                >
                  <span>{shop.name}</span>
                  <span className="text-redText text-xs">{shop.location}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Shops;
