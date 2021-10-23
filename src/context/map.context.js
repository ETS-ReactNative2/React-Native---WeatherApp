import React, { createContext, useContext, useEffect, useState } from "react";
import { WeatherContext } from "./weather.context";

export const MapContext = createContext();

export const MapContextProvider = ({ children }) => {
  const { countryCode } = useContext(WeatherContext);
  const [flag, setFlag] = useState(null);

  const getCountryDetails = async (code) => {
    const response = await fetch(
      `https://restcountries.com/v3.1/alpha/${code}`
    );
    const resposneJson = await response.json();
    setFlag(resposneJson[0].flags.png);
  };

  useEffect(() => {
    console.log("mapcontext useEffect");
    getCountryDetails(countryCode);
  }, [countryCode]);

  return <MapContext.Provider value={{ flag }}>{children}</MapContext.Provider>;
};
