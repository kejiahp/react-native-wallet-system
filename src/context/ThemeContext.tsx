import React, {
  createContext,
  useState,
  useEffect,
  PropsWithChildren,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "react-native";

type PossibleThemes = "light" | "dark" | null | undefined;

export const ThemeContext = createContext<{
  theme: PossibleThemes;
  toggleTheme: (theme: PossibleThemes) => void;
}>({
  theme: null,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: PropsWithChildren) {
  const colorScheme = useColorScheme();

  const [theme, setTheme] = useState<PossibleThemes>(colorScheme || "light");

  useEffect(() => {
    // Load saved theme from storage
    const getTheme = async () => {
      try {
        const savedTheme = (await AsyncStorage.getItem(
          "theme"
        )) as PossibleThemes;
        if (savedTheme) {
          setTheme(savedTheme);
        }
      } catch (error) {
        console.log("Error loading theme:", error);
      }
    };
    getTheme();
  }, []);

  useEffect(() => {
    // set theme to system selected theme
    if (colorScheme) {
      setTheme(colorScheme);
    }
  }, [colorScheme]);

  const toggleTheme = (newTheme: PossibleThemes) => {
    setTheme(newTheme);
    AsyncStorage.setItem("theme", newTheme || "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
