import React, { useContext } from "react";
import Container from "../ui/Container";
import { ScaledSheet } from "react-native-size-matters";
import { ThemeContext } from "../context/ThemeContext";
import Label from "../ui/Label";

export default function Login() {
  const { COLORS } = useContext(ThemeContext);

  return (
    <Container outerViewStyle={{ backgroundColor: COLORS.bgWhite }}>
      <Label>This is the login page.</Label>
    </Container>
  );
}

const styles = ScaledSheet.create({
  container: {},
});
