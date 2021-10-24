import React, { useContext, useState } from "react";
import { Image, Text, View } from "react-native";
import { List, Badge, Button, ProgressBar, Colors } from "react-native-paper";
import { WeatherContext } from "../context/weather.context";
import { getAllWeather } from "../helpers/download-all-countries-data";

const MoreScreen = ({ navigation }) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const { setAllCountriesWeather } = useContext(WeatherContext);

  const submitHandler = async () => {
    setVisible(true);
    getAllWeather(setProgress, setAllCountriesWeather, setVisible);
  };

  return (
    <View>
      <List.Item
        onPress={() => navigation.navigate("CountryCode")}
        title="Country Code"
        description="Get the list of all country code"
        left={(props) => <List.Icon {...props} icon="clipboard-list" />}
      />
      <List.Item
        onPress={() => navigation.navigate("FiveDayForecast")}
        title="Five Day Forecast"
        description="Get the weather info of all countries displayed on map"
        left={(props) => <List.Icon {...props} icon="globe-model" />}
      />
      <List.Item
        onPress={() => navigation.navigate("AllCountries")}
        title="All Countries"
        description="Get the weather info of all countries"
        left={(props) => <List.Icon {...props} icon="cellphone-screenshot" />}
        right={(props) => (
          <Badge size={25} style={{ backgroundColor: "yellow" }}>
            Beta
          </Badge>
        )}
      />
      <List.Item
        onPress={submitHandler}
        title="Download"
        description="Download the data required for 'All Countries' section"
        left={(props) => <List.Icon {...props} icon="progress-download" />}
      />
      <ProgressBar
        progress={progress}
        visible={visible}
        color={Colors.red800}
      />
    </View>
  );
};

export default MoreScreen;
