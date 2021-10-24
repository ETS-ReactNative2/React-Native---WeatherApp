import React, { useContext, useState } from "react";
import {
  Text,
  View,
  ImageBackground,
  useWindowDimensions,
  StyleSheet,
  VirtualizedList,
} from "react-native";
import Locations from "../../model/locations";
import { useEffect } from "react/cjs/react.development";
import { allCountriesData } from "../../assets/data/allCountriesDummy";
import { calculateDateTimeNative } from "../helpers/calculate-date-time-from-unix";
import { setBackgroundImageFromCondition } from "../helpers/set-background-image-from-condition";
import SeperatorComponent from "../components/seperator.component";
import BottomInfoWrapper from "../components/bottom-info-wrapper.component";
import TopInfoWrapper from "../components/top-info-wrapper";
import { ActivityIndicator, Colors } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { WeatherContext } from "../context/weather.context";

const AllCountriesScreen = () => {
  const { allCountriesWeather } = useContext(WeatherContext);
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const [weatherResult, setWeatherResult] = useState([]);
  const [visible, setVisible] = useState(true);
  const location = Locations[0];

  const getWeatherDetails = async () => {
    const result = allCountriesData;
    setWeatherResult(result);
  };

  const getItemCount = (_) => 250;

  const DATA = [];

  const getItem = (_, index) =>
    allCountriesWeather.length > 1
      ? allCountriesWeather[index]
      : allCountriesData[index];

  useEffect(() => {
    getWeatherDetails();
  }, []);

  if (!weatherResult || !weatherResult.length) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="medium" color={Colors.black} />
      </View>
    );
  }

  return (
    <View>
      {weatherResult && weatherResult.length > 0 && (
        <VirtualizedList
          horizontal
          pagingEnabled
          onScrollBeginDrag={() => setVisible(false)}
          initialNumToRender={2}
          getItemCount={getItemCount}
          getItem={getItem}
          showsHorizontalScrollIndicator={false}
          data={DATA}
          keyExtractor={(data, index) => `${data}${index}`}
          renderItem={({ item }) => {
            const bgImage = setBackgroundImageFromCondition(
              item.weather[0].main
            );
            const time = calculateDateTimeNative(item.timezone);
            item.time = time;
            return (
              <View style={{ height: windowHeight - 50, width: windowWidth }}>
                <ImageBackground
                  style={{ flex: 1 }}
                  source={bgImage ? bgImage : require("../../assets/sunny.jpg")}
                >
                  <View style={styles.infoContainer}>
                    {/* TopInfoWrapper */}
                    <TopInfoWrapper
                      location={location}
                      allCountries
                      item={item}
                    />
                    {/* Seperator */}
                    <SeperatorComponent />
                    {/* BottomWrapper */}
                    <BottomInfoWrapper
                      location={location}
                      allCountries={true}
                      item={item}
                    />
                  </View>
                </ImageBackground>
                <View style={styles.swipeIconContainer(visible)}>
                  <AntDesign name="doubleright" size={50} color="white" />
                </View>
                <View style={styles.swipeContainer(visible)}>
                  <Text style={styles.swipeText}>Please Swipe</Text>
                </View>
                <View style={styles.betaContainer(visible)}>
                  <Text style={styles.betaText}>
                    This is in beta stage. Download the data from the 'More'
                    section for the updated data.
                  </Text>
                </View>
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  betaText: {
    textAlign: "center",
    fontSize: 20,
    color: "white",
  },
  betaContainer: (visible) => ({
    position: "absolute",
    top: "17%",
    opacity: visible ? 1 : 0,
  }),
  swipeText: {
    fontSize: 30,
    color: "white",
  },
  swipeContainer: (visible) => ({
    position: "absolute",
    left: "25%",
    top: "10%",
    opacity: visible ? 1 : 0,
  }),
  swipeIconContainer: (visible) => ({
    position: "absolute",
    right: 20,
    top: "10%",
    opacity: visible ? 1 : 0,
  }),
});

export default AllCountriesScreen;
