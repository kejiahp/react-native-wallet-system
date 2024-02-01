import React from "react";
//importing bottom tabs
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

import CurrentWeather from "../screens/current-weather";
import UpcomingWeather from "../screens/upcoming-weather";
import City from "../screens/City";

//intializing the tab object
const Tab = createBottomTabNavigator();

/**
 *
 * React Native has two types of navigation on with tabs the other with the use of the stack navigator
 *
 * Tabs are usually displayed at the top of the screen on android and at the bottom of the screen of ios. Material Top Tabs helps to active this platform specific navigation, with the Platform Api OS property
 */
function TabContext() {
  /**
   * This can also be used directly on the Tab.Screen Component options prop
   */
  const screenOptions = (route) => {
    return {
      tabBarIcon: ({ focused, color, size }) => {
        let iconName = "smile";

        if (route.name === "Current Weather") {
          iconName = "droplet";
        } else if (route.name === "Upcoming Weather") {
          iconName = "clock";
        } else if (route.name === "City") {
          iconName = "home";
        }

        return <Feather name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "skyblue",
      tabBarInactiveTintColor: "#353535",
      tabBarStyle: {
        backgroundColor: "#ddd",
      },
      //STYLING THE TAB HEADER BAR
      headerStyle: {
        backgroundColor: "#ddd",
      },
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 20,
      },
    };
  };

  return (
    <Tab.Navigator screenOptions={(e) => screenOptions(e.route)}>
      <Tab.Screen name="Current Weather" component={CurrentWeather} />
      <Tab.Screen name="Upcoming Weather" component={UpcomingWeather} />
      <Tab.Screen name="City" component={City} />
    </Tab.Navigator>
  );
}

export default TabContext;
