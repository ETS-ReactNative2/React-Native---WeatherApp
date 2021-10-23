import React, { useState, useEffect, useContext } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";
import { useFocusEffect } from "@react-navigation/core";
import { Searchbar } from "react-native-paper";
import { WebView } from "react-native-webview";
import { WeatherContext } from "../context/weather.context";
import { MapContext } from "../context/map.context";

const MapScreen = () => {
  const {
    setWeather,
    name,
    latitude,
    longitude,
    temperature,
    error,
    setError,
  } = useContext(WeatherContext);
  const { flag } = useContext(MapContext);
  const [keyword, setKeyword] = useState("");

  const submitHandler = async () => {
    setKeyword("");
    setWeather(keyword);
  };

  useFocusEffect(
    React.useCallback(() => {
      setKeyword("");
      setError(null);
    }, [])
  );

  return (
    <>
      <Searchbar
        placeholder="Search... (eg: city,country-code)"
        style={styles.searchBarInput}
        value={keyword}
        onChangeText={(text) => setKeyword(text)}
        onSubmitEditing={submitHandler}
      />
      {error ? (
        <View
          style={{
            zIndex: 999999,
            position: "absolute",
            textAlign: "center",
            width: "100%",
            backgroundColor: "#ea685f",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              zIndex: 9999,
              textAlign: "center",
              color: "white",
            }}
          >
            {error}
          </Text>
        </View>
      ) : (
        <View
          style={{
            zIndex: 999999,
            position: "absolute",
            textAlign: "center",
            width: "100%",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              zIndex: 9999,
              textAlign: "center",
            }}
          ></Text>
        </View>
      )}
      <MapView
        style={styles.map}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 4,
          longitudeDelta: 5,
        }}
      >
        <MapView.Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
        >
          <MapView.Callout tooltip={true}>
            <View
              style={{
                height: 150,
                width: 120,
                padding: 10,
                alignItems: "center",
                maxHeight: 120,
                borderRadius: 25,
                backgroundColor: "gray",
              }}
            >
              <WebView
                style={{
                  height: 52,
                  width: 100,
                  backgroundColor: "white",
                }}
                source={{
                  uri: flag ? flag : "https://flagcdn.com/w320/ht.png",
                }}
              />
              <Text style={{ color: "white", fontWeight: "bold" }}>
                {name ? name : "Norway"}
              </Text>
              <Text style={{ fontWeight: "bold", color: "white" }}>
                Temp: {temperature ? `${temperature}\u2103` : "27\u2103"}
              </Text>
            </View>
          </MapView.Callout>
        </MapView.Marker>
      </MapView>
    </>
  );
};

const styles = StyleSheet.create({
  searchBarInput: {
    position: "absolute",
    top: 30,
    left: 10,
    right: 10,
    zIndex: 1000,
  },
  map: {
    flex: 1,
  },
});

export default MapScreen;
