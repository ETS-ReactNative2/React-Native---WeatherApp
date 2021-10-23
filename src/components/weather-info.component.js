import React from "react";
import { StyleSheet, Text, View } from "react-native";

const WeatherInfo = ({ infoLabel, infoUnit, infoColor, infoValue }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <Text style={styles.infoText}>{infoLabel}</Text>
      <Text style={[styles.infoText, { fontSize: 24 }]}>{infoValue}</Text>
      <Text style={styles.infoText}>{infoUnit}</Text>
      <View style={styles.infoBar}>
        <View
          style={{
            height: 5,
            width: infoValue / 2,
            backgroundColor: infoColor,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoBar: {
    height: 5,
    width: 45,
    backgroundColor: "rgba(255,255,255,0.7)",
  },
  infoText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "Lato-Regular",
  },
});

export default WeatherInfo;
