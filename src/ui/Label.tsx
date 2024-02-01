import React, { PropsWithChildren, useContext } from "react";
import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";
import { FONT, SIZES } from "./style";
import { scale } from "react-native-size-matters";
import { ThemeContext } from "../context/ThemeContext";

type Props = {
  style?: StyleProp<TextStyle>;
};

export default function Label({ style, children }: PropsWithChildren<Props>) {
  const { COLORS } = useContext(ThemeContext);
  return (
    <Text style={[styles.label, { color: COLORS.black }, style]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: scale(SIZES.medium),
    fontFamily: FONT.regular,
  },
});
