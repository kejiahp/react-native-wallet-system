import React, { useContext } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { ThemeContext } from "../context/ThemeContext";

export default function Spinner() {
  const { COLORS } = useContext(ThemeContext);
  return (
    <View style={[styles.container, { backgroundColor: COLORS.bgWhite }]}>
      <ActivityIndicator size="large" color={COLORS.black} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
