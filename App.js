import "react-native-gesture-handler";
import React from "react";
import { WeatherContextProvider } from "./src/context/weather.context";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HomeScreen from "./src/screens/home.screen";
import MapScreen from "./src/screens/map.screen";
import { MapContextProvider } from "./src/context/map.context";
import MoreStackNavigation from "./src/navigation/more.navigation";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <WeatherContextProvider>
        <MapContextProvider>
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarStyle: {
                backgroundColor: "#262525",
              },
              tabBarActiveTintColor: "tomato",
            }}
          >
            <Tab.Screen
              name="Main"
              component={HomeScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons
                    name="home"
                    color={color}
                    size={size}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Map"
              component={MapScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons
                    name="google-maps"
                    color={color}
                    size={size}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="MoreMain"
              component={MoreStackNavigation}
              options={{
                title: "More",
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons
                    name="more"
                    color={color}
                    size={size}
                  />
                ),
              }}
            />
          </Tab.Navigator>
        </MapContextProvider>
      </WeatherContextProvider>
    </NavigationContainer>
  );
}
