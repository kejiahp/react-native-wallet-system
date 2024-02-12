import {
  View,
  Text,
  Keyboard,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useContext, useState } from "react";
import OtpInputField from "../ui/OtpInputField";
import Container from "../ui/Container";
import { ScaledSheet } from "react-native-size-matters";
import { ThemeContext } from "../context/ThemeContext";
import Label from "../ui/Label";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { WelcomeStackNavigationProp } from "../navigation/WelcomeStack";
import { FONT, SIZES } from "../ui/style";
import Button from "../ui/Button";
import { useMutation } from "@tanstack/react-query";
import { verifyAccountService } from "../service/authentication.service";
import { notify } from "../ui/CustomToast";
import {
  deleteUserData,
  getUserData,
  setUser,
} from "../storage/welcome.storage";
import { AxiosError } from "axios";

export default function AccountVerification() {
  //otp dependencies
  const [code, setCode] = useState("");
  const [pinReady, setPinReady] = useState(false);
  const MAX_CODE_LENGTH = 6;

  const [userData, setUserData] = useState<{
    email: string;
    email_verified: boolean;
  }>({
    email: "",
    email_verified: false,
  });

  const { COLORS } = useContext(ThemeContext);
  const navigation = useNavigation<WelcomeStackNavigationProp>();

  const getUserCallback = useCallback(() => {
    getUserData()
      .then((res) => {
        if (!res) {
          notify({
            title: "Something went wrong",
            variant: "error",
            children: (
              <Label style={{ fontSize: SIZES.xsmall }}>
                Kindly create an account
              </Label>
            ),
          });
          navigation.navigate("CreateAcct");
        } else if (res.email_verified) {
          notify({
            title: "Account already verified",
            variant: "success",
          });
          navigation.navigate("Login");
        } else {
          setUserData(res);
        }
      })
      .catch(() => {
        notify({
          title: "Failed to retrieve user data",
          variant: "error",
          children: <Label>Kindly create an account</Label>,
        });
      });
  }, []);

  useFocusEffect(getUserCallback);

  const verifyAcctMtn = useMutation({
    mutationFn: verifyAccountService,
    onSuccess: (data) => {
      notify({
        variant: "success",
        title: data?.message || "Account created successfully",
      });
      deleteUserData()
        .then((res) => {
          setUser({
            email: userData.email,
            email_verified: true,
          })
            .then(() => {
              navigation.navigate("Login");
            })
            .catch(() => {
              notify({
                variant: "error",
                title: "Oops something went wrong",
                children: (
                  <Label style={{ fontSize: SIZES.xsmall }}>
                    failed to store user data
                  </Label>
                ),
              });
            });
        })
        .catch(() => {
          console.log("User data delete failed");
        });
    },
    onError: (error: any) => {
      if (error instanceof AxiosError) {
        if (error.response?.data.errors) {
          notify({
            variant: "error",
            title: error?.response?.data?.message || "Something went wrong",
            children: (
              <View>
                {error.response?.data.errors.map((item: any, index: number) => (
                  <Label key={index} style={{ fontSize: SIZES.xsmall }}>
                    {item.message}
                  </Label>
                ))}
              </View>
            ),
          });
        } else {
          notify({
            variant: "error",
            title: error?.response?.data?.message || "Something went wrong",
          });
        }
      } else {
        notify({
          variant: "error",
          title: error?.response?.data?.message || "Something went wrong",
        });
      }
    },
  });

  const verifyHandler = () => {
    if (code.length !== 6) {
      notify({
        title: "OTP code is required",
        variant: "error",
      });
      return;
    }
    verifyAcctMtn.mutate({
      data: {
        otp: code,
        email: userData.email,
      },
    });
  };

  return (
    <Container outerViewStyle={{ backgroundColor: COLORS.bgWhite }}>
      <Pressable style={styles.container} onPress={Keyboard.dismiss}>
        <Label style={[styles.title, { color: COLORS.primary }]}>
          Account Verification
        </Label>

        <Label style={{ fontSize: SIZES.xsmall }}>
          We have sent an email with code to{" "}
          <Text style={{ fontFamily: FONT.bold }}>
            {userData.email || "email@gmail.com"},
          </Text>{" "}
          Please enter the code below and hit the sign up button.
        </Label>

        <OtpInputField
          code={code}
          setCode={setCode}
          pinReady={pinReady}
          setPinReady={setPinReady}
          maxLength={MAX_CODE_LENGTH}
        />

        <View style={styles.centeredBtn}>
          <Button
            disabled={!pinReady || verifyAcctMtn.isPending}
            onPress={verifyHandler}
          >
            <View
              style={{
                flexDirection: "row",
                gap: 10,
              }}
            >
              {verifyAcctMtn.isPending && (
                <ActivityIndicator color={COLORS.black} />
              )}
              <Label style={{ fontFamily: FONT.bold }}>Sign Up</Label>
            </View>
          </Button>
        </View>
      </Pressable>
    </Container>
  );
}

const styles = ScaledSheet.create({
  container: {
    paddingVertical: "10@s",
    gap: "10@s",
    flex: 1,
  },
  title: {
    fontFamily: FONT.bold,
    fontWeight: "800",
    fontSize: SIZES.large,
  },
  centeredBtn: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "20@s",
  },
});
