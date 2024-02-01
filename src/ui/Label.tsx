import React, { PropsWithChildren } from "react";
import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";
import { COLORS, FONT, SIZES } from "./style";
import { scale } from "react-native-size-matters";

type Props = {
  style?: StyleProp<TextStyle>;
};

export default function Label({ style, children }: PropsWithChildren<Props>) {
  return <Text style={[styles.label, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  label: {
    fontSize: scale(SIZES.medium),
    fontFamily: FONT.regular,
    color: COLORS.black,
  },
});
