import React, {
  useState,
  useRef,
  useContext,
  useEffect,
  SetStateAction,
} from "react";
import { ScaledSheet } from "react-native-size-matters";
import InputField from "./InputField";
import { Pressable, TextInput, View } from "react-native";
import Label from "./Label";
import { FONT, SIZES } from "./style";
import { ThemeContext } from "../context/ThemeContext";

type Props = {
  code: string;
  setCode: React.Dispatch<SetStateAction<string>>;
  pinReady: boolean;
  setPinReady: React.Dispatch<SetStateAction<boolean>>;
  maxLength: number;
};

export default function OtpInputField({
  code,
  setCode,
  setPinReady,
  maxLength,
}: Props) {
  const inputRef = useRef<TextInput>(null);
  const { COLORS } = useContext(ThemeContext);
  const [inputContainerFocus, setInputContainerFocus] =
    useState<boolean>(false);

  const handleOnPress = () => {
    setInputContainerFocus(true);
    inputRef?.current?.focus();
  };
  const handleOnBlur = () => {
    setInputContainerFocus(false);
  };

  useEffect(() => {
    setPinReady(code.length === maxLength);
    return () => setPinReady(false);
  }, [code]);

  const maxLengthArray = new Array(maxLength).fill(0);

  const digitToInput = (_value: string, index: number) => {
    const emptyInputChar = " ";

    const digit = code[index] || emptyInputChar;

    const isCurrentDigit = index === code.length;

    const isLastDigit = index === maxLength - 1;

    const isCodeFull = code.length === maxLength;

    const isDigitFocused = isCurrentDigit || (isLastDigit && isCodeFull);

    const styledInput = inputContainerFocus && isDigitFocused;

    return (
      <View
        key={index}
        style={[
          styles.otpInput,
          { borderColor: styledInput ? COLORS.secondary : COLORS.black },
        ]}
      >
        <Label style={styles.otpText}>{digit}</Label>
      </View>
    );
  };

  return (
    <View>
      <Pressable onPress={handleOnPress} style={styles.otpInputContainer}>
        {maxLengthArray.map(digitToInput)}
      </Pressable>
      <InputField
        style={styles.hideTextInput}
        value={code}
        onChangeText={setCode}
        maxLength={maxLength}
        keyboardType="number-pad"
        returnKeyType="done"
        textContentType="oneTimeCode"
        ref={inputRef}
        onBlur={handleOnBlur}
      />
    </View>
  );
}

const styles = ScaledSheet.create({
  hideTextInput: {
    position: "absolute",
    width: "1@s",
    height: "1@s",
    opacity: 0,
  },
  otpInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  otpInput: {
    minWidth: "15%",
    borderWidth: "2@s",
    borderRadius: "10@s",
    padding: "12@s",
    fontSize: SIZES.small,
  },
  otpText: {
    textAlign: "center",
    fontFamily: FONT.bold,
  },
});
