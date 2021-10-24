import React from "react";
import SunIcon from "../../assets/sun.svg";
import CloudIcon from "../../assets/cloudy.svg";
import MoonIcon from "../../assets/moon.svg";
import RainIcon from "../../assets/rain.svg";

const getWeatherIcon = (weatherType) => {
  if (weatherType == "Sunny")
    return <SunIcon height={34} width={34} fill="#fff" />;
  if (weatherType == "Cloudy")
    return <CloudIcon height={34} width={34} fill="#fff" />;
  if (weatherType == "Rainy")
    return <RainIcon height={34} width={34} fill="#fff" />;
  if (weatherType == "Night")
    return <MoonIcon height={34} width={34} fill="#fff" />;
};

export default getWeatherIcon;
