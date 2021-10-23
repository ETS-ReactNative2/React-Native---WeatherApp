import React, { useContext, useState } from "react";
import { StyleSheet, View, StatusBar, Text, Modal } from "react-native";
import {
  Button,
  Dialog,
  Paragraph,
  Portal,
  Searchbar,
  Provider,
} from "react-native-paper";
import { WeatherContext } from "../context/weather.context";

const SearchLocationInput = ({ location, setLocation, submitHandler }) => {
  const { error } = useContext(WeatherContext);

  return (
    <View style={styles.appHeader}>
      <Searchbar
        iconColor="white"
        placeholder="Search... (eg: city,country-code)"
        fontSize={14}
        placeholderTextColor="white"
        style={styles.searchBar}
        value={location}
        onChangeText={(loc) => setLocation(loc)}
        onSubmitEditing={submitHandler}
        color="white"
      />
      {error ? (
        <Text
          style={{
            textAlign: "center",
            fontSize: 14,
            marginTop: 0,
            color: "red",
            fontWeight: "bold",
            fontFamily: "Lato-Thin",
          }}
        >
          {error}
        </Text>
      ) : (
        <Text></Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  appHeader: {
    height: StatusBar.currentHeight + 60,
    paddingHorizontal: 20,
    top: StatusBar.currentHeight,
    width: "90%",
    left: 20,
    right: 20,
    justifyContent: "center",
    position: "absolute",
  },
  searchBar: {
    backgroundColor: "transparent",
    borderColor: "rgba(255,255,255,0.7)",
    borderWidth: 2,
    borderRadius: 10,
    color: "white",
  },
});

export default SearchLocationInput;
