import React, { useContext } from "react";
import Container from "../../ui/Container";
import Label from "../../ui/Label";
import { AuthContext } from "../../context/AuthContext";
import { ScaledSheet } from "react-native-size-matters";
import { ThemeContext } from "../../context/ThemeContext";
import { View } from "react-native";
import { FONT, SIZES } from "../../ui/style";

export default function DashboardHome() {
  const { authState } = useContext(AuthContext);
  const { COLORS } = useContext(ThemeContext);

  return (
    <Container
      outerViewStyle={{ backgroundColor: COLORS.bgWhite }}
      innerViewStyle={styles.container}
    >
      <View style={[styles.wallet, { backgroundColor: COLORS.secondary }]}>
        <Label
          style={{
            fontFamily: FONT.bold,
          }}
        >
          342 952 25251
        </Label>
        <View>
          <Label
            style={{
              fontFamily: FONT.bold,
              fontSize: SIZES.xxSmall,
            }}
          >
            Balance
          </Label>
          <Label
            style={{
              fontFamily: FONT.bold,
              fontSize: SIZES.xxLarge,
            }}
          >
            20,000
          </Label>
        </View>
      </View>
    </Container>
  );
}

const styles = ScaledSheet.create({
  container: {},
  wallet: {
    borderRadius: "8@s",
    width: "100%",
    padding: "15@s",
    gap: "20@s",
    marginVertical: "20@s",
  },
});
