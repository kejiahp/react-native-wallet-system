import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  ViewStyle,
  StyleProp,
} from "react-native";
import React, { PropsWithChildren } from "react";
import { scale } from "react-native-size-matters";

type Props = {
  isScrollable?: boolean;
  outerViewStyle?: StyleProp<ViewStyle>;
  innerViewStyle?: StyleProp<ViewStyle>;
};

export default function Container({
  children,
  isScrollable,
  outerViewStyle,
  innerViewStyle,
}: PropsWithChildren<Props>) {
  return (
    <SafeAreaView style={[styles.outerView, outerViewStyle]}>
      {isScrollable ? (
        <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
          <View style={[styles.innerView, innerViewStyle]}>{children}</View>
        </ScrollView>
      ) : (
        <View style={[styles.innerView, innerViewStyle]}>{children}</View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  outerView: {
    flex: 1,
  },
  innerView: {
    flex: 1,
    paddingHorizontal: scale(20),
  },
});
