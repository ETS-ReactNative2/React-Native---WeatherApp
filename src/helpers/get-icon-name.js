import React from "react";
import { Fontisto, Ionicons, Feather } from "@expo/vector-icons";

const GetIconName = (weather) => {
  switch (weather) {
    case "Thunderstorm":
      return <Ionicons name="thunderstorm-outline" color="#957dfb" size={50} />;
    case "Drizzle":
      return <Feather name="cloud-drizzle" color="#957dfb" size={50} />;
    case "Rain":
      return <Fontisto name="rains" color="#957dfb" size={50} />;
    case "Snow":
      return <Fontisto name="snowflake" color="#957dfb" size={50} />;
    case "Mist":
      return <Fontisto name="fog" color="#957dfb" size={50} />;
    case "Smoke":
      return <Fontisto name="fog" color="#957dfb" size={50} />;
    case "Haze":
      return <Fontisto name="fog" color="#957dfb" size={50} />;
    case "Dust":
      return <Fontisto name="fog" color="#957dfb" size={50} />;
    case "Fog":
      return <Fontisto name="fog" color="#957dfb" size={50} />;
    case "Sand":
      return <Fontisto name="fog" color="#957dfb" size={50} />;
    case "Dust":
      return <Fontisto name="fog" color="#957dfb" size={50} />;
    case "Ash":
      return <Fontisto name="fog" color="#957dfb" size={50} />;
    case "Sqauil":
      return <Fontisto name="fog" color="#957dfb" size={50} />;
    case "Tornado":
      return <Fontisto name="fog" color="#957dfb" size={50} />;
    case "Clear":
      return <Fontisto name="day-sunny" color="#957dfb" size={50} />;
    case "Clouds":
      return <Fontisto name="cloudy" color="#957dfb" size={50} />;
  }
};

export default GetIconName;
