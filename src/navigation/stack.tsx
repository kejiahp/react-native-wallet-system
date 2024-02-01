import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

import React from "react";
import Main from "../screens/Main";
import { COLORS, SIZES, icons, images } from "../constants";
import { ScreenHeaderBtn } from "../components";
import JobDetails from "../screens/JobDetails";
import { useNavigation } from "@react-navigation/native";
import Search from "../screens/Search";

function StackNavigation() {
  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Main}
        options={{
          headerStyle: {
            backgroundColor: COLORS.lightWhite,
          },
          headerLeftContainerStyle: {
            paddingLeft: SIZES.medium,
          },
          headerRightContainerStyle: {
            paddingRight: SIZES.medium,
          },
          headerShadowVisible: false,
          headerTitle: "",
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.menu}
              dimension={"60%"}
              handlePress={""}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn
              iconUrl={images.profile}
              dimension={"100%"}
              handlePress={""}
            />
          ),
        }}
      />

      <Stack.Screen
        name="Job-Details"
        component={JobDetails}
        options={{
          headerTitle: "",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: COLORS.lightWhite,
          },
          headerLeftContainerStyle: {
            paddingLeft: SIZES.medium,
          },
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => navigation.goBack()}
            />
          ),
          headerRightContainerStyle: {
            paddingRight: SIZES.medium,
          },
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension={"60%"} />
          ),
        }}
      />

      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => navigation.goBack()}
            />
          ),
          headerTitle: "",
        }}
      />
    </Stack.Navigator>
  );
}

export default StackNavigation;
