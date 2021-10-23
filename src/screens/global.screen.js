import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { Button, Card, Paragraph, Title } from "react-native-paper";
import { Fontisto } from "@expo/vector-icons";
// import { Icon } from "react-native-gradient-icon";

const GlobalScreen = () => {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  return (
    <View style={{ flex: 1, alignItems: "center", backgroundColor: "#081b25" }}>
      <Card
        style={{
          width: windowWidth / 2,
          height: windowWidth / 2,
          marginTop: 50,
          backgroundColor: "#152c39",
          borderRadius: 30,
        }}
      >
        <Card.Content>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View>
              <Title>Card title</Title>
              <Paragraph>Card content</Paragraph>
            </View>
            {/*  */}
            <View>
              <Fontisto name="day-sunny" color="green" size={70} />
            </View>
            {/*  */}
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

export default GlobalScreen;
