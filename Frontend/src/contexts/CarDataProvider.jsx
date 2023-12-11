import { createContext, useContext, useState, useEffect } from "react";

const CarDataContext = createContext();

export const CarDataProvider = ({ children }) => {
  const [carData, setCarData] = useState();

  useEffect(() => {
    // getCarData();
  }, []);

  const getCarData = () => {
    fetch("data.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (myJson) {
        console.log(myJson);
        setCarData(myJson);
      });
  };

  return (
    <CarDataContext.Provider value={{ carData }}>
      {children}
    </CarDataContext.Provider>
  );
};

export const useCarData = () => {
  const context = useContext(CarDataContext);
  if (!context) {
    throw new Error("useCarData must be used within an CarDataProvider");
  }
  return context;
};
