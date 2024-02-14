import { View, Text } from "react-native";
import React, { useContext } from "react";
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import DashboardHome from "../screens/dashboard/Home";
import { ThemeContext } from "../context/ThemeContext";
import { Feather } from "@expo/vector-icons";
import { FONT, SHADOWS, SIZES } from "../ui/style";
import { TouchableOpacity } from "react-native-gesture-handler";
import Label from "../ui/Label";
import Logout from "../components/Logout";

type AuthenticatedTabParamList = {
  DashboardHome: undefined;
};
export type AuthenticatedTabNavigationProp =
  BottomTabNavigationProp<AuthenticatedTabParamList>;

const Tab = createBottomTabNavigator<AuthenticatedTabParamList>();

export default function AuthenticatedTab() {
  const { COLORS, theme } = useContext(ThemeContext);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShadowVisible: true,
        headerTitle: "",
        headerRight: (props) => <Logout {...props} />,
        headerRightContainerStyle: {
          paddingRight: SIZES.small,
        },
        headerLeft: (props) => (
          <Label
            style={{
              fontFamily: FONT.bold,
              color: COLORS.black,
            }}
          >
            Wallet App
          </Label>
        ),
        headerLeftContainerStyle: {
          paddingLeft: SIZES.small,
        },
        headerStyle: {
          backgroundColor: COLORS.bgWhite,
          shadowColor: "transparent",
        },
        tabBarActiveTintColor: COLORS.secondary,
        tabBarInactiveTintColor: COLORS.gray300,
        tabBarStyle: {
          backgroundColor: theme === "light" ? COLORS.tertiary : COLORS.black,
          position: "absolute",
          bottom: 25,
          left: 20,
          right: 20,
          borderTopWidth: 0,
          borderRadius: 15,
          paddingVertical: 20,
          ...SHADOWS.small,
        },
      }}
    >
      <Tab.Screen
        name="DashboardHome"
        component={DashboardHome}
        options={{
          tabBarIcon: ({ size, ...props }) => (
            <Feather name="home" size={30} {...props} />
          ),
          tabBarShowLabel: false,
        }}
      />
    </Tab.Navigator>
  );
}
