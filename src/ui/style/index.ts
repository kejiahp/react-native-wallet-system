import { scale } from "react-native-size-matters";
import { BASE_COLORS as COLORS } from "../theme";

const FONT = {
  regular: "NunitoRegular",
  medium: "NunitoMedium",
  bold: "NunitoBold",
  italics: "NunitoItalic",
};

const SIZES = {
  xxSmall: scale(10),
  xsmall: scale(12),
  small: scale(14),
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
