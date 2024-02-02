import {
  Pressable,
  StyleProp,
  ViewStyle,
  PressableProps,
  StyleSheet,
} from "react-native";
import React, { PropsWithChildren } from "react";
import { ScaledSheet } from "react-native-size-matters";
import { COLORS } from "./style";

interface Props extends PressableProps {
  varaint?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSize;
  isLoading?: boolean;
  style?: StyleProp<ViewStyle>;
}

function Button({
  varaint,
  size,
  style,
  children,
  ...props
}: PropsWithChildren<Props>) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        (!varaint || varaint === "default") && buttonVariants.default,
        varaint === "secondary" && buttonVariants.secondary,
        varaint === "destructive" && buttonVariants.destructive,
        varaint === "link" && buttonVariants.link,
        (!size || size === "default") && buttonSize.default,
        size === "xsm" && buttonSize.xsm,
        size === "sm" && buttonSize.sm,
        size === "lg" && buttonSize.lg,
        size === "icon" && buttonSize.icon,
        props.disabled && { opacity: 0.3 },
        style,
        pressed && { opacity: 0.6 },
      ]}
      {...props}
    >
      {children}
    </Pressable>
  );
}

export default Button;

const buttonVariants = StyleSheet.create({
  default: {
    backgroundColor: COLORS.primary,
  },
  secondary: {
    backgroundColor: COLORS.secondary,
  },
  destructive: {
    backgroundColor: COLORS.destructive,
  },
  link: {
    backgroundColor: "transparent",
  },
});

const buttonSize = ScaledSheet.create({
  default: {
    height: "40@s",
    paddingHorizontal: "16@s",
    paddingVertical: "8@s",
  },
  xsm: {
    height: "24@s",
    paddingHorizontal: "4@s",
  },
  sm: {
    height: "32@s",
    paddingHorizontal: "12@s",
  },
  lg: {
    height: "44@s",
    paddingHorizontal: "32@s",
  },
  icon: {
    height: "40@s",
    paddingHorizontal: "40@s",
  },
});

const styles = ScaledSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "10@s",
    elevation: "3@s",
  },
});
