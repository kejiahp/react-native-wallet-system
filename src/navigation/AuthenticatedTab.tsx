import { View, Text } from "react-native";
import React from "react";
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import DashboardHome from "../screens/dashboard/Home";

type AuthenticatedTabParamList = {
  DashboardHome: undefined;
};
export type AuthenticatedTabNavigationProp =
  BottomTabNavigationProp<AuthenticatedTabParamList>;

const Tab = createBottomTabNavigator<AuthenticatedTabParamList>();

export default function AuthenticatedTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="DashboardHome" component={DashboardHome} />
    </Tab.Navigator>
  );
}
