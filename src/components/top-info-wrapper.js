import React, { useContext } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { WeatherContext } from "../context/weather.context";
import getWeatherIcon from "../helpers/get-weather-icon";

const TopInfoWrapper = ({ location, allCountries = false, item = null }) => {
  const { temperature, name, dateTime, icon, weatherResult } =
    useContext(WeatherContext);
  return (
    <View style={styles.topInfoWrapper}>
      <View>
        <Text style={styles.city}>
          {allCountries
            ? item
              ? item.name
              : location.city
            : name
            ? name
            : location.city}
        </Text>
        <Text style={styles.time}>
          {allCountries
            ? item
              ? item.time
              : location.dateTime
            : dateTime
            ? dateTime
            : location.dateTime}
        </Text>
      </View>

      <View>
        <Text style={styles.temperature}>
          {allCountries
            ? item
              ? `${item.main.temp}\u2103`
              : location.temperature
            : temperature
            ? `${temperature}\u2103`
            : location.temparature}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {icon ? (
            <Image
              style={styles.iconContainer}
              resizeMode="contain"
              source={{
                uri: allCountries
                  ? `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
                  : icon,
              }}
            />
          ) : (
            getWeatherIcon(location.weatherType)
          )}
          <Text style={styles.weatherType}>
            {allCountries
              ? item.weather[0].main
              : weatherResult
              ? weatherResult.weather[0].main
              : location.weatherType}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topInfoWrapper: {
    flex: 1,
    marginTop: 160,
    justifyContent: "space-between",
  },
  city: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "bold",
    fontFamily: "Lato-Regular",
  },
  time: {
    color: "#fff",
    fontWeight: "bold",
    fontFamily: "Lato-Regular",
  },
  temperature: {
    color: "#fff",
    fontFamily: "Lato-Light",
    fontSize: 85,
  },
  weatherType: {
    fontFamily: "Lato-Regular",
    color: "#fff",
    fontSize: 25,
    lineHeight: 34,
    marginLeft: 10,
    fontWeight: "bold",
  },
  iconContainer: {
    width: 100,
    height: 100,
  },
});

export default TopInfoWrapper;
