import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MoreScreen from "../screens/more.screen";
import CountryCodeScreen from "../screens/country-code.screen";
import AllCountriesScreen from "../screens/all-countries.screen";
import GlobalScreen from "../screens/global.screen";

const MoreStack = createStackNavigator();

const MoreStackNavigation = () => {
  return (
    <MoreStack.Navigator>
      <MoreStack.Screen name="More" component={MoreScreen} />
      <MoreStack.Screen name="CountryCode" component={CountryCodeScreen} />
      <MoreStack.Screen
        name="AllCountries"
        component={AllCountriesScreen}
        options={{
          headerShown: false,
        }}
      />
      <MoreStack.Screen name="Global" component={GlobalScreen} />
    </MoreStack.Navigator>
  );
};

export default MoreStackNavigation;
