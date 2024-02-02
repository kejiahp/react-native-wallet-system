import {
  NativeSyntheticEvent,
  StyleProp,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  ViewStyle,
} from "react-native";
import React, { useContext, useState } from "react";
import { ScaledSheet } from "react-native-size-matters";
import { ThemeContext } from "../context/ThemeContext";
import { SIZES } from "./style";

interface Props extends TextInputProps {
  style?: StyleProp<ViewStyle>;
}

export default function InputField({
  style,
  onFocus,
  onBlur,
  ...props
}: Props) {
  const [focused, setFocused] = useState(false);
  const custOnFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setFocused(!focused);
    if (onFocus) {
      onFocus(e);
    }
  };

  const custOnBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setFocused(!focused);
    if (onBlur) {
      onBlur(e);
    }
  };

  const { COLORS } = useContext(ThemeContext);
  return (
    <TextInput
      onFocus={custOnFocus}
      onBlur={custOnBlur}
      style={[
        styles.inputField,
        {
          color: COLORS.black,
          borderColor: focused ? COLORS.primary : COLORS.black,
        },
        style,
      ]}
      placeholderTextColor={COLORS.gray100}
      {...props}
    />
  );
}

const styles = ScaledSheet.create({
  inputField: {
    width: "100%",
    borderWidth: "1@s",
    borderRadius: "10@s",
    padding: "12@s",
    fontSize: SIZES.small,
  },
});
