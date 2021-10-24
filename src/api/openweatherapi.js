import React from "react";

export const WeatherForecastRequest = async (city, country) => {
  const baseURL = `https://api.openweathermap.org/data/2.5/weather?appid=13e157a6bcc179236409cd5239abac8e&units=metric&q=`;
  try {
    const url = !country ? `${baseURL}${city}` : `${baseURL}${city},${country}`;
    const response = await fetch(url);
    const responseJson = await response.json();
    return responseJson;
  } catch (err) {
    console.log("open weather api error", err);
  }
};

export const FiveDayThreeHourForecast = async (city, country) => {
  const baseURL =
    "https://api.openweathermap.org/data/2.5/forecast?appid=13e157a6bcc179236409cd5239abac8e&units=metric&q=";
  try {
    const url = !country ? `${baseURL}${city}` : `${baseURL}${city},${country}`;
    const response = await fetch(url);
    const responseJson = await response.json();
    return responseJson;
  } catch (err) {
    console.log("open weather for forecast api error", err);
  }
};
