import { StyleSheet, Text, TextInputProps, View } from "react-native";
import React from "react";
import Label from "../Label";
import InputField from "../InputField";
import { COLORS, FONT, SIZES } from "../style";
import { ScaledSheet } from "react-native-size-matters";

export function FormError({ message }: { message: string | undefined }) {
  return (
    <Label
      style={{
        color: COLORS.destructive,
        fontSize: SIZES.xsmall,
        fontFamily: FONT.bold,
      }}
    >
      {message}
    </Label>
  );
}

interface Props extends TextInputProps {
  label: string;
  errorMessage: string | undefined;
}

export function FormInputField({ errorMessage, label, ...props }: Props) {
  return (
    <View style={styles.container}>
      <Label style={{ fontSize: SIZES.small }}>{label}</Label>
      <InputField {...props} />
      <FormError message={errorMessage} />
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    marginVertical: "5@s",
  },
});
