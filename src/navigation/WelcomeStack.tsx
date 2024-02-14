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
import Label from "../ui/Label";
import { ScaledSheet } from "react-native-size-matters";
import AccountVerification from "../screens/AccountVerification";
import { TouchableOpacity } from "react-native-gesture-handler";
import Login from "../screens/Login";
import AuthenticatedTab from "./AuthenticatedTab";
import { AuthContext } from "../context/AuthContext";

type WelcomeStackParamList = {
  Welcome: undefined;
  CreateAcct: undefined;
  AcctVerification: undefined;
  Login: undefined;
  Dashboard: undefined;
};
export type WelcomeStackNavigationProp =
  StackNavigationProp<WelcomeStackParamList>;

export type WelcomeRoutePropType = RouteProp<WelcomeStackParamList, "Welcome">;
export type AcctVerificationRoutePropType = RouteProp<
  WelcomeStackParamList,
  "AcctVerification"
>;

const Stack = createStackNavigator<WelcomeStackParamList>();

export default function WelcomeStackNavigator() {
  const { COLORS } = useContext(ThemeContext);
  const { authState } = useContext(AuthContext);

  const navigation = useNavigation<WelcomeStackNavigationProp>();

  return (
    <Stack.Navigator initialRouteName="Welcome">
      {authState.authenticated ? (
        <>
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name={"Dashboard"}
            component={AuthenticatedTab}
          />
        </>
      ) : (
        <>
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
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Feather
                    name="chevron-left"
                    size={30}
                    color={COLORS.primary}
                  />
                  <Label style={[styles.title, { color: COLORS.primary }]}>
                    Sign Up
                  </Label>
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="AcctVerification"
            component={AccountVerification}
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
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Feather
                    name="chevron-left"
                    size={30}
                    color={COLORS.primary}
                  />
                  <Label
                    style={[
                      styles.title,
                      { color: COLORS.primary, fontSize: SIZES.medium },
                    ]}
                  >
                    Go back
                  </Label>
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
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
                <Label
                  style={[
                    styles.title,
                    { color: COLORS.primary, fontSize: SIZES.large },
                  ]}
                >
                  Login
                </Label>
              ),
            }}
          />
        </>
      )}
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
