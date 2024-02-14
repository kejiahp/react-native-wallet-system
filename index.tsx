import React, { useCallback } from "react";
import App from "./App";
import AxiosProvider from "./src/service/AxiosContext";
import { ThemeProvider } from "./src/context/ThemeContext";
import { registerRootComponent } from "expo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();

function Root() {
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
      <AxiosProvider>
        <QueryClientProvider client={queryClient}>
          <StatusBar style="auto" />
          <View onLayout={prepare} />
          <App />
        </QueryClientProvider>
      </AxiosProvider>
    </ThemeProvider>
  );
}

registerRootComponent(Root);
