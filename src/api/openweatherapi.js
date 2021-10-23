import React from "react";

const baseURL = `https://api.openweathermap.org/data/2.5/weather?appid=13e157a6bcc179236409cd5239abac8e&units=metric&q=`;

export const WeatherForecastRequest = async (city, country) => {
  try {
    const url = !country ? `${baseURL}${city}` : `${baseURL}${city},${country}`;
    const response = await fetch(url);
    const responseJson = await response.json();
    return responseJson;
  } catch (err) {
    console.log("open weather api error", err);
  }
};

//13e157a6bcc179236409cd5239abac8e

//backup - ab85ba57bbbb423fb62bfb8201126ede
