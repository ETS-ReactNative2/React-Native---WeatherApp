import React, { useContext, useState } from "react";
import { StatusBar } from "react-native";
import { ImageBackground, useWindowDimensions, View } from "react-native";
import { useFonts } from "expo-font";
import Locations from "../../model/locations";
import SearchLocationInput from "../components/search-location-input.component";
import BottomInfoWrapper from "../components/bottom-info-wrapper.component";
import SeperatorComponent from "../components/seperator.component";
import TopInfoWrapper from "../components/top-info-wrapper";
import { WeatherContext } from "../context/weather.context";

export default function HomeScreen() {
  const { setWeather, backgroundImage } = useContext(WeatherContext);
  const [keyword, setKeyword] = useState("");
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const location = Locations[0];
  let [loaded] = useFonts({
    "Lato-Regular": require("../../assets/fonts/Lato-Regular.ttf"),
    "Lato-Thin": require("../../assets/fonts/Lato-Thin.ttf"),
    "Lato-Light": require("../../assets/fonts/Lato-Light.ttf"),
  });

  const submitHandler = async () => {
    setKeyword("");
    setWeather(keyword);
  };

  if (!loaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={{ height: windowHeight - 50, width: windowWidth }}>
        <ImageBackground
          style={{ flex: 1 }}
          source={
            backgroundImage
              ? backgroundImage
              : require("../../assets/sunny.jpg")
          }
        >
          <View
            style={{
              flex: 1,
              padding: 20,
              backgroundColor: "rgba(0,0,0,0.4)",
            }}
          >
            {/* TopInfoWrapper */}
            <TopInfoWrapper location={location} />
            {/* Seperator */}
            <SeperatorComponent />
            {/* BottomWrapper */}
            <BottomInfoWrapper location={location} />
          </View>
        </ImageBackground>
      </View>
      <SearchLocationInput
        location={keyword}
        setLocation={setKeyword}
        submitHandler={submitHandler}
      />
    </>
  );
}
