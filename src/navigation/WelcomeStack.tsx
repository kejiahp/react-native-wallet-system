import React, { useContext } from "react";
import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
import Welcome from "../screens/Welcome";
import CreateAccount from "../screens/CreateAccount";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { SIZES } from "../ui/style";
import { ThemeContext } from "../context/ThemeContext";

type WelcomeStackParamList = {
  Welcome: undefined;
  CreateAcct: undefined;
};
export type WelcomeStackNavigationProp =
  StackNavigationProp<WelcomeStackParamList>;

export type RoutePropType = RouteProp<WelcomeStackParamList, "Welcome">;

const Stack = createStackNavigator<WelcomeStackParamList>();

export default function WelcomeStackNavigator() {
  const { COLORS } = useContext(ThemeContext);
  const navigation = useNavigation<WelcomeStackNavigationProp>();

  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CreateAcct"
        component={CreateAccount}
        options={{
          headerStyle: {
            backgroundColor: COLORS.white,
          },
          headerLeftContainerStyle: {
            paddingLeft: SIZES.small,
          },
          headerShadowVisible: false,
          headerTitle: "",
          headerLeft: (props) => (
            <Feather
              name="chevron-left"
              size={30}
              color={COLORS.black}
              onPress={() => navigation.goBack()}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
