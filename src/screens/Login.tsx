import React, { useContext } from "react";
import Container from "../ui/Container";
import { ScaledSheet } from "react-native-size-matters";
import { ThemeContext } from "../context/ThemeContext";
import { useForm, Controller } from "react-hook-form";
import {
  LoginValidationSchemaType,
  login_validation_schema,
} from "../schema/authentication.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Keyboard, Pressable, View } from "react-native";
import { FormInputField } from "../ui/formFields/FormFields";
import Label from "../ui/Label";
import { FONT, SIZES } from "../ui/style";
import Button from "../ui/Button";
import { useMutation } from "@tanstack/react-query";
import { AxiosContext } from "../service/AxiosContext";
import { loginService } from "../service/authentication.service";
import { notify } from "../ui/CustomToast";
import { AxiosError } from "axios";
import { AuthContext } from "../context/AuthContext";

import { saveToSecureStore } from "../storage/secure.storage";
import { securekeys } from "../utils/async.keys";

export default function Login() {
  const { COLORS } = useContext(ThemeContext);
  const { publicAxios } = useContext(AxiosContext);
  const { setAuthState } = useContext(AuthContext);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginValidationSchemaType>({
    resolver: zodResolver(login_validation_schema),
  });

  const loginMtn = useMutation({
    mutationFn: loginService,
    onSuccess: (data) => {
      const datax: {
        access_token: string;
        refresh_token: string;
      } = data.data;

      notify({
        variant: "success",
        title: data.message || "Login successful",
      });

      setAuthState({
        accessToken: datax.access_token,
        refreshToken: datax.refresh_token,
        authenticated: true,
      });

      saveToSecureStore(
        securekeys.auth_tokens,
        JSON.stringify({
          accessToken: datax.access_token,
          refreshToken: datax.refresh_token,
        })
      )
        .then((res) => {
          console.log(res);
          console.log("login successful");
        })
        .catch((error) => {
          console.log(error);
          console.log("save tokens to keychain failed");
        });
    },
    onError: (error: any) => {
      console.log(error);
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

  const onSubmitHandler = (inputData: LoginValidationSchemaType) => {
    if (!publicAxios) {
      notify({
        variant: "error",
        title: "Invalid auth instance",
      });
      return;
    }

    loginMtn.mutate({
      authInstance: publicAxios,
      email: inputData.email,
      password: inputData.password,
    });
  };

  return (
    <Container outerViewStyle={{ backgroundColor: COLORS.bgWhite }}>
      <Pressable style={styles.container} onPress={Keyboard.dismiss}>
        <Label
          style={{
            textAlign: "center",
            fontSize: SIZES.xsmall,
          }}
        >
          Login into your account
        </Label>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInputField
              label="Email"
              placeholder="example@email.com"
              keyboardType="email-address"
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              errorMessage={errors.email?.message}
            />
          )}
          name="email"
          defaultValue=""
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInputField
              label="Password"
              placeholder="Example123@"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              errorMessage={errors.password?.message}
            />
          )}
          name="password"
          defaultValue=""
        />
        <Button
          disabled={loginMtn.isPending}
          onPress={handleSubmit(onSubmitHandler)}
        >
          <Label
            style={{
              fontFamily: FONT.bold,
            }}
          >
            Continue
          </Label>
        </Button>
      </Pressable>
    </Container>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    marginVertical: "20@s",
  },
});
