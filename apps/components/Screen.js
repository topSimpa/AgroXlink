import Constants from "expo-constants";
import { StyleSheet, SafeAreaView } from "react-native";

import React from "react";

function Screen({ children, style }) {
  return <SafeAreaView style={[styles.screen, style]}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  screen: {
    width: "100%",
    height: "100%",
    paddingTop: Constants.statusBarHeight,
  },
});
export default Screen;
