import React, {
  createContext,
  useState,
  useEffect,
  PropsWithChildren,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "react-native";
import { BASE_COLORS, DARK_COLORS } from "../ui/theme";

type PossibleThemes = "light" | "dark" | null | undefined;
type ColorsType = typeof BASE_COLORS;

export const ThemeContext = createContext<{
  COLORS: ColorsType;
  theme: PossibleThemes;
  toggleTheme: (theme: PossibleThemes) => void;
}>({
  COLORS: BASE_COLORS,
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

  const COLORS = theme === "dark" ? DARK_COLORS : BASE_COLORS;

  return (
    <ThemeContext.Provider value={{ COLORS, theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
