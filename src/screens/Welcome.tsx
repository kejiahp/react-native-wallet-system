import React from "react";
import Label from "../ui/Label";
import { ImageBackground, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, FONT, SIZES } from "../ui/style";
import { ScaledSheet } from "react-native-size-matters";
import Button from "../ui/Button";
import { useNavigation } from "@react-navigation/native";
import { WelcomeStackNavigationProp } from "../navigation/WelcomeStack";

export default function Welcome() {
  const navigation = useNavigation<WelcomeStackNavigationProp>();

  //   const { params } = useRoute<RoutePropType>();
  //   console.log(params.lol)

  return (
    <ImageBackground
      style={styles.background}
      resizeMode="cover"
      source={require("../../assets/images/MobileWallet.jpg")}
    >
      <LinearGradient
        // Background Linear Gradient
        colors={[
          // "transparent",
          "rgba(0,0,0,0.2)",
          "rgba(0,0,0,0.3)",
          "rgba(0,0,0,0.4)",
          "rgba(0,0,0,0.5)",
          "rgba(0,0,0,0.7)",
        ]}
        style={styles.gradient}
      >
        <Label style={styles.title}>
          <Text style={{ color: COLORS.primary }}>put</Text> money,{" "}
          <Text style={{ color: COLORS.secondary }}>get</Text> money,{" "}
          <Text style={{ color: COLORS.gray200 }}>lock</Text> money{" "}
        </Label>
        <View style={styles.island}>
          <Label
            style={{
              color: COLORS.white,
              fontSize: SIZES.small,
              textAlign: "center",
            }}
          >
            Let us be the ones to manage your wallet
          </Label>
          <Button
            size="lg"
            varaint="default"
            onPress={() => navigation.navigate("CreateAcct")}
          >
            <Label style={{ color: COLORS.white }}>Let's Begin</Label>
          </Button>
          <Button varaint="link">
            <Label
              style={{
                color: COLORS.white,
                fontSize: SIZES.small,
                textAlign: "center",
                textDecorationLine: "underline",
              }}
            >
              Already have an acount ?
            </Label>
          </Button>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = ScaledSheet.create({
  background: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "space-between",
    padding: "20@s",
  },
  title: {
    color: COLORS.white,
    fontFamily: FONT.bold,
    fontWeight: "800",
    fontSize: SIZES.xxLarge,
    textTransform: "uppercase",
    textAlign: "center",
    marginTop: "50@s",
  },
  island: {
    gap: 10,
  },
});
