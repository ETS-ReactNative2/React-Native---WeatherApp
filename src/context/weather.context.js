import React, { createContext, useEffect, useState } from "react";
import { WeatherForecastRequest } from "../api/openweatherapi";
import { calculateDateTimeFromUnix } from "../helpers/calculate-date-time-from-unix";
import { ConvertMeterPerSecondsToKilometerPerHours } from "../helpers/convert-mps-to-kph";
import { setBackgroundImageFromCondition } from "../helpers/set-background-image-from-condition";
import { countriesData } from "../../assets/data/countriesData";
export const WeatherContext = createContext();

export const WeatherContextProvider = ({ children }) => {
  const [weatherResult, setWeatherResult] = useState(null);
  const [name, setName] = useState("Norway");
  const [dateTime, setDateTime] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [wind, setWind] = useState(null);
  const [clouds, setClouds] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [icon, setIcon] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [error, setError] = useState(null);
  const [latitude, setLatitude] = useState(45.7869);
  const [longitude, setLongitude] = useState(-87.9037);
  const [countryCode, setCountryCode] = useState("NO");

  const setWeather = async (location) => {
    setError(null);
    const [city, country] = location.split(",");
    const result = await WeatherForecastRequest(city, country);
    if (result.cod == 200) return setWeatherResult(result);

    setError(result.message);
  };

  useEffect(() => {
    setWeather("Norway,NO");
  }, []);

  useEffect(() => {
    console.log("weatherContext useEffect");
    const result = async () => {
      if (weatherResult && weatherResult.main) {
        setTemperature(Math.ceil(weatherResult.main.temp));
        setName(`${weatherResult.name}, ${weatherResult.sys.country}`);
        const formattedDateTime = await calculateDateTimeFromUnix(
          weatherResult.dt,
          weatherResult.timezone
        );
        setDateTime(formattedDateTime);
        setWind(
          Math.ceil(
            ConvertMeterPerSecondsToKilometerPerHours(weatherResult.wind.speed)
          )
        );
        setHumidity(weatherResult.main.humidity);
        setClouds(weatherResult.clouds.all);
        setIcon(
          `http://openweathermap.org/img/wn/${weatherResult.weather[0].icon}@2x.png`
        );
        setBackgroundImage(
          setBackgroundImageFromCondition(weatherResult.weather[0].main)
        );
        setLatitude(weatherResult.coord.lat);
        setLongitude(weatherResult.coord.lon);
        setCountryCode(weatherResult.sys.country);
      }
    };

    result();
  }, [weatherResult]);

  return (
    <WeatherContext.Provider
      value={{
        weatherResult,
        temperature,
        name,
        dateTime,
        wind,
        humidity,
        clouds,
        icon,
        backgroundImage,
        latitude,
        longitude,
        countryCode,
        setWeather,
        error,
        setError,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
