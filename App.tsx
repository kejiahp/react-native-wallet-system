import "react-native-gesture-handler";

import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { useCallback, useContext } from "react";
import { View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "./src/context/ThemeContext";
import WelcomeStackNavigator from "./src/navigation/WelcomeStack";
import Toast from "react-native-toast-message";
import { CustomToast } from "./src/ui/CustomToast";

const toastConfig = {
  custom: CustomToast,
};

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    NunitoBold: require("./assets/fonts/NunitoBold.ttf"),
    NunitoRegular: require("./assets/fonts/NunitoRegular.ttf"),
    NunitoMedium: require("./assets/fonts/NunitoMedium.ttf"),
    NunitoItalic: require("./assets/fonts/NunitoItalic.ttf"),
  });

  const prepare = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <ThemeProvider>
      <NavigationContainer>
        <View onLayout={prepare} />
        <StatusBar style="auto" />
        <WelcomeStackNavigator />
      </NavigationContainer>
      <Toast config={toastConfig} />
    </ThemeProvider>
  );
}
