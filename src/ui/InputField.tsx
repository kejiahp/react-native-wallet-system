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

const InputField = React.forwardRef<TextInput, Props>(
  ({ style, onFocus, onBlur, ...props }, ref) => {
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
        ref={ref}
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
);

export default InputField;

const styles = ScaledSheet.create({
  inputField: {
    width: "100%",
    borderWidth: "1@s",
    borderRadius: "10@s",
    padding: "12@s",
    fontSize: SIZES.small,
  },
});
