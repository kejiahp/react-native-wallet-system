import React, { useContext } from "react";
import Container from "../ui/Container";
import Label from "../ui/Label";
import { ScaledSheet } from "react-native-size-matters";
import { FONT, SIZES } from "../ui/style";
import { ThemeContext } from "../context/ThemeContext";
import { TextInput, View } from "react-native";
import Button from "../ui/Button";

export default function CreateAccount() {
  const { COLORS } = useContext(ThemeContext);

  return (
    <Container
      outerViewStyle={[{ backgroundColor: COLORS.white }]}
      innerViewStyle={styles.background}
    >
      <Label style={[styles.title]}>Login</Label>
      <View>
        <Button>
          <Label style={{ fontSize: SIZES.medium }}>Create Account</Label>
        </Button>
      </View>
    </Container>
  );
}

const styles = ScaledSheet.create({
  background: {
    justifyContent: "space-evenly",
  },
  title: {
    fontFamily: FONT.bold,
    fontWeight: "800",
    fontSize: SIZES.xxLarge,
    textTransform: "uppercase",
    textAlign: "center",
    marginTop: "50@s",
  },
});
