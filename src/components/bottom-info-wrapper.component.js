import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { WeatherContext } from "../context/weather.context";
import WeatherInfo from "./weather-info.component";

const BottomInfoWrapper = ({ location, allCountries = false, item = null }) => {
  const { wind, humidity, clouds } = useContext(WeatherContext);
  return (
    <View style={styles.bottomInfoWrapper}>
      <WeatherInfo
        infoLabel="Wind"
        infoUnit="km/hr"
        infoValue={
          allCountries
            ? item
              ? item.wind.speed
              : location.wind
            : wind
            ? wind
            : location.wind
        }
        infoColor="#69F0AE"
      />

      <WeatherInfo
        infoLabel="Clouds"
        infoUnit="%"
        infoValue={
          allCountries
            ? item
              ? item.clouds.all
              : location.rain
            : clouds
            ? clouds
            : location.rain
        }
        infoColor="#F44336"
      />

      <WeatherInfo
        infoLabel="Humidity"
        infoUnit="%"
        infoValue={
          allCountries
            ? item
              ? item.main.humidity
              : location.humidity
            : humidity
            ? humidity
            : location.humidity
        }
        infoColor="#F44336"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bottomInfoWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
});

export default BottomInfoWrapper;
