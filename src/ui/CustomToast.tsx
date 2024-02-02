import { View } from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import Toast, { BaseToastProps, ToastProps } from "react-native-toast-message";
import { FONT, SIZES } from "./style";
import Label from "./Label";

type Props = {
  props: {
    variant: "success" | "error" | "info";
    otherChilderen: React.ReactNode;
  };
} & BaseToastProps;

export function CustomToast({ props, ...otherProps }: Props) {
  const { COLORS } = useContext(ThemeContext);
  return (
    <View
      style={{
        minHeight: SIZES.xxLarge * 2,
        width: "80%",
        backgroundColor: COLORS.bgBlack,
        borderRadius: SIZES.xxSmall,
        padding: SIZES.xsmall,
        borderLeftWidth: 10,
        borderLeftColor:
          props.variant === "success"
            ? COLORS.green100
            : props.variant === "error"
            ? COLORS.destructive
            : COLORS.blue100,
      }}
    >
      <Label
        style={{
          color: COLORS.white,
          fontSize: SIZES.small,
          fontFamily: FONT.bold,
        }}
      >
        {otherProps.text1}
      </Label>
      {props.otherChilderen}
    </View>
  );
}

export function notify({
  title,
  variant,
  children,
  position = "bottom",
}: {
  title: string;
  variant: Props["props"]["variant"];
  children?: Props["props"]["otherChilderen"];
  position?: ToastProps["position"];
}) {
  Toast.show({
    type: "custom",
    position: position,
    text1: title,
    props: {
      variant: variant,
      otherChilderen: children,
    },
  });
}
