import React, { useContext } from "react";
import Label from "../ui/Label";
import { ImageBackground, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FONT, SIZES } from "../ui/style";
import { ScaledSheet } from "react-native-size-matters";
import Button from "../ui/Button";
import { useNavigation } from "@react-navigation/native";
import { WelcomeStackNavigationProp } from "../navigation/WelcomeStack";
import { ThemeContext } from "../context/ThemeContext";

export default function Welcome() {
  const navigation = useNavigation<WelcomeStackNavigationProp>();
  const { COLORS } = useContext(ThemeContext);

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
        colors={["rgba(0,0,0,0.2)", "rgba(0,0,0,0.3)"]}
        style={styles.gradient}
      >
        <Label style={[styles.title]}>
          <Text style={{ color: COLORS.primary }}>put</Text> money,{" "}
          <Text style={{ color: COLORS.secondary }}>get</Text> money,{" "}
          <Text style={{ color: COLORS.gray200 }}>lock</Text> money{" "}
        </Label>

        <View style={styles.island}>
          <Label
            style={{
              fontFamily: FONT.bold,
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
            <Label
              style={{
                fontFamily: FONT.bold,
              }}
            >
              Let's Begin
            </Label>
          </Button>
          <Button varaint="link" onPress={() => navigation.navigate("Login")}>
            <Label
              style={{
                fontFamily: FONT.bold,
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
    fontFamily: FONT.bold,
    fontWeight: "800",
    fontSize: SIZES.xxLarge,
    textTransform: "uppercase",
    textAlign: "center",
    marginTop: "50@s",
  },
  island: {
    gap: 5,
    marginBottom: "20@s",
  },
});
