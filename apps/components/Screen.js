import Constants from "expo-constants";
import { StyleSheet, SafeAreaView } from "react-native";

import React from "react";

function Screen({ children, style }) {
  return <SafeAreaView style={[styles.screen, style]}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
});
export default Screen;
