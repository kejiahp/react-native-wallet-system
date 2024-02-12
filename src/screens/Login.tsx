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
import { Keyboard, Pressable } from "react-native";
import { FormInputField } from "../ui/formFields/FormFields";
import Label from "../ui/Label";
import { FONT, SIZES } from "../ui/style";
import Button from "../ui/Button";

export default function Login() {
  const { COLORS } = useContext(ThemeContext);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginValidationSchemaType>({
    resolver: zodResolver(login_validation_schema),
  });

  const onSubmitHandler = (inputData: LoginValidationSchemaType) => {
    console.log(inputData);
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
        <Button onPress={handleSubmit(onSubmitHandler)}>
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
