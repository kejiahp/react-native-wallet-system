import React, { useContext } from "react";
import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
import Welcome from "../screens/Welcome";
import CreateAccount from "../screens/CreateAccount";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { FONT, SIZES } from "../ui/style";
import { ThemeContext } from "../context/ThemeContext";
import { View } from "react-native";
import Label from "../ui/Label";
import { BASE_COLORS } from "../ui/theme";
import { ScaledSheet } from "react-native-size-matters";

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
            backgroundColor: COLORS.bgWhite,
          },
          headerLeftContainerStyle: {
            paddingLeft: SIZES.small,
          },
          headerShadowVisible: false,
          headerTitle: "",
          headerLeft: (props) => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Feather
                name="chevron-left"
                size={30}
                color={COLORS.primary}
                onPress={() => navigation.goBack()}
              />
              <Label style={[styles.title, { color: COLORS.primary }]}>
                Sign Up
              </Label>
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

const styles = ScaledSheet.create({
  title: {
    marginLeft: "10@s",
    fontFamily: FONT.bold,
    fontWeight: "800",
    fontSize: SIZES.large,
    textAlign: "center",
  },
});
