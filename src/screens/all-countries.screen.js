import React, { useState } from "react";
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

const AllCountriesScreen = () => {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const [weatherResult, setWeatherResult] = useState([]);
  const location = Locations[0];

  const getWeatherDetails = async () => {
    const result = allCountriesData;
    setWeatherResult(result);
  };

  const getItemCount = (_) => 250;

  const DATA = [];

  const getItem = (_, index) => allCountriesData[index];

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
                  <View
                    style={{
                      flex: 1,
                      padding: 20,
                      backgroundColor: "rgba(0,0,0,0.4)",
                    }}
                  >
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
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

export default AllCountriesScreen;
