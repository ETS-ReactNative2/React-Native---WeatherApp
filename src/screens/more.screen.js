import React from "react";
import { Image, Text, View } from "react-native";
import { List } from "react-native-paper";

const MoreScreen = ({ navigation }) => {
  return (
    <View>
      <List.Item
        onPress={() => navigation.navigate("CountryCode")}
        title="Country Code"
        description="Get the list of all country code"
        left={(props) => <List.Icon {...props} icon="clipboard-list" />}
      />
      <List.Item
        onPress={() => navigation.navigate("AllCountries")}
        title="All Countries"
        description="Get the weather info of all countries"
        left={(props) => <List.Icon {...props} icon="cellphone-screenshot" />}
      />
      <List.Item
        onPress={() => navigation.navigate("Global")}
        title="Global"
        description="Get the weather info of all countries displayed on map"
        left={(props) => <List.Icon {...props} icon="globe-model" />}
      />
    </View>
  );
};

export default MoreScreen;
