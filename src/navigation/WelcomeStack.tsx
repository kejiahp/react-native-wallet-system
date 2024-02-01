import React from "react";
import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
import Welcome from "../screens/Welcome";
import CreateAccount from "../screens/CreateAccount";

type WelcomeStackParamList = {
  Welcome: undefined;
  CreateAcct: undefined;
};
export type WelcomeStackNavigationProp =
  StackNavigationProp<WelcomeStackParamList>;

const Stack = createStackNavigator<WelcomeStackParamList>();

export default function WelcomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        // options={{
        //   headerStyle: {
        //     backgroundColor: COLORS.lightWhite,
        //   },
        //   headerLeftContainerStyle: {
        //     paddingLeft: SIZES.medium,
        //   },
        //   headerRightContainerStyle: {
        //     paddingRight: SIZES.medium,
        //   },
        //   headerShadowVisible: false,
        //   headerTitle: "",
        //   headerLeft: () => (
        //     <ScreenHeaderBtn
        //       iconUrl={icons.menu}
        //       dimension={"60%"}
        //       handlePress={""}
        //     />
        //   ),
        //   headerRight: () => (
        //     <ScreenHeaderBtn
        //       iconUrl={images.profile}
        //       dimension={"100%"}
        //       handlePress={""}
        //     />
        //   ),
        // }}
      />
      <Stack.Screen name="CreateAcct" component={CreateAccount} />
    </Stack.Navigator>
  );
}
