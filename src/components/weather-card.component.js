import React from "react";
import { Text, useWindowDimensions, View } from "react-native";
import { Card } from "react-native-paper";
import { Fontisto, Ionicons, Feather } from "@expo/vector-icons";
import { Icon } from "react-native-gradient-icon";
import { ConvertMeterPerSecondsToKilometerPerHours } from "../helpers/convert-mps-to-kph";
import GetIconName from "../helpers/get-icon-name";

const getIconName = (weather) => {
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

const WeatherCard = ({ city, country, result }) => {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const dateTime = result.dt_txt;
  const time = dateTime.split(" ")[1].substring(0, 5);
  const date = dateTime.split(" ")[0];
  return (
    // <View style={{ flex: 1, alignItems: "center", backgroundColor: "#081b25" }}>
    <Card
      style={{
        width: windowWidth / 2.2,
        height: windowWidth / 2,
        marginTop: 25,
        backgroundColor: "#152c39",
        borderRadius: 30,
      }}
    >
      <Card.Content>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Text
              style={{
                fontSize: 50,
                color: "white",
                fontFamily: "Lato-Regular",
              }}
            >
              {Math.round(result.main.temp)}
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 20,
                fontFamily: "Lato-Regular",
                marginTop: -5,
              }}
            >{` \°`}</Text>
          </View>
          {/*  */}
          <View>
            {
              // For creating icons with linear gradient
              /* <Icon
              size={75}
              colors={[
                { color: "rgba(0,212,255,1)", offset: "0", opacity: "1" },
                { color: "rgba(69,162,253,1)", offset: "0.1", opacity: "1" },
                { color: "rgba(204,99,249,1)", offset: "1", opacity: "1" },
              ]}
              name="snowflake"
              type="fontisto"
            /> */
            }
            {GetIconName(result.weather[0].main)}
          </View>
          {/*  */}
        </View>
        <View style={{ marginTop: 5 }}>
          <Text
            style={{
              fontSize: city.length > 11 ? 14 : 18,
              color: "white",
              lineHeight: 34,
            }}
          >
            {city}
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{
                fontSize: 18,
                color: "white",
                fontFamily: "Lato-Light",
                lineHeight: 24,
              }}
            >
              {country}
            </Text>
            <View style={{ alignItems: "center", marginTop: -8 }}>
              <Text style={{ fontSize: 12, color: "white" }}>{time}</Text>
              <Text style={{ fontSize: 12, color: "white" }}>{date}</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="water-outline" size={25} color="#6180ae" />
            <Text style={{ fontSize: 16, color: "white", marginLeft: 5 }}>
              {result.main.humidity}%
            </Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Feather name="wind" size={25} color="#6180ae" />
            <View style={{ flexDirection: "row", alignItems: "baseline" }}>
              <Text style={{ fontSize: 16, color: "white", marginLeft: 5 }}>
                {Math.round(
                  ConvertMeterPerSecondsToKilometerPerHours(result.wind.speed)
                )}
              </Text>
              <Text style={{ color: "white", fontSize: 8 }}>km/hr</Text>
            </View>
          </View>
        </View>
      </Card.Content>
    </Card>
    // </View>
  );
};

export default WeatherCard;
