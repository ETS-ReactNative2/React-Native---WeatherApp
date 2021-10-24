import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { ActivityIndicator, Searchbar } from "react-native-paper";
import { FiveDayThreeHourForecast } from "../api/openweatherapi";
import WeatherCard from "../components/weather-card.component";

const FiveDayForecast = () => {
  // const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const [forecast, setForecast] = useState(null);
  const [keyword, setKeyword] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const data = Array.from(new Array(1, 2, 3, 4, 5, 6));
  const name = "Kentucky";

  const getForecastData = async (location = "norway,no") => {
    setLoading(true);
    const response = await FiveDayThreeHourForecast(location);
    if (response.cod == 200) {
      setForecast(response);
      setLoading(false);
    } else {
      setError("No city found");
    }
  };

  const submitHandler = () => {
    setKeyword("");
    getForecastData(keyword);
  };

  useEffect(() => {
    getForecastData();
  }, []);

  if (!forecast || loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#081b25",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator animating={true} color="#50788d" />
      </View>
    );
  }

  return (
    <View style={styles.viewContainer}>
      <Searchbar
        placeholder="Search... (eg: city,country-code)"
        iconColor="#50788d"
        placeholderTextColor="#7c8a93"
        value={keyword}
        onChangeText={(text) => setKeyword(text)}
        onSubmitEditing={submitHandler}
        fontSize={15}
        color="#7c8a93"
        style={styles.searchBar}
      />
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <Text
          style={{
            color: "white",
            fontSize: 12,
            textAlign: "center",
            marginHorizontal: 20,
          }}
        ></Text>
      )}
      <FlatList
        data={forecast.list}
        numColumns={2}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <View style={styles.flatListViewContainer}>
            <WeatherCard
              city={forecast.city.name}
              country={forecast.city.country}
              result={item}
            />
          </View>
        )}
      />
      {/* <WeatherCard /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    backgroundColor: "#081b25",
    flex: 1,
  },
  searchBar: {
    backgroundColor: "transparent",
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: "#7c8a93",
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 15,
    fontSize: 15,
  },
  errorText: {
    color: "white",
    fontSize: 12,
    backgroundColor: "red",
    textAlign: "center",
    marginHorizontal: 20,
  },
  flatListViewContainer: {
    paddingLeft: 10,
  },
});

export default FiveDayForecast;
