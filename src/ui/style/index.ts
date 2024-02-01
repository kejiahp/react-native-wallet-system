import { scale } from "react-native-size-matters";

const COLORS = {
  primary: "#0ea5e9",
  secondary: "#a855f7",
  tertiary: "#082f49",
  destructive: "#ef4444",

  gray100: "#6b7280",
  gray200: "#4b5563",

  black: "#000",
  white: "#FFF",
};

const FONT = {
  regular: "NunitoRegular",
  medium: "NunitoMedium",
  bold: "NunitoBold",
  italics: "NunitoItalic",
};

const SIZES = {
  xSmall: scale(10),
  small: scale(12),
  medium: scale(16),
  large: scale(20),
  xLarge: scale(24),
  xxLarge: scale(32),
};

const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: scale(0),
      height: scale(2),
    },
    shadowOpacity: scale(0.25),
    shadowRadius: scale(3.84),
    elevation: scale(2),
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: scale(0),
      height: scale(2),
    },
    shadowOpacity: scale(0.25),
    shadowRadius: scale(5.84),
    elevation: scale(5),
  },
};

export { COLORS, FONT, SIZES, SHADOWS };
