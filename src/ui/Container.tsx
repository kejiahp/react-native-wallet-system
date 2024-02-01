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
  bodyStyle?: StyleProp<ViewStyle>;
};

export default function Container({
  children,
  isScrollable,
  bodyStyle,
}: PropsWithChildren<Props>) {
  return (
    <SafeAreaView style={styles.container}>
      {isScrollable ? (
        <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
          <View style={[styles.innerView, bodyStyle]}>{children}</View>
        </ScrollView>
      ) : (
        <View style={[styles.innerView, bodyStyle]}>{children}</View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerView: {
    flex: 1,
    paddingHorizontal: scale(10),
  },
});
