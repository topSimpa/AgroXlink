import Constants from "expo-constants";
import { StyleSheet, SafeAreaView } from "react-native";

import React from "react";

function AppView({ children }) {
  return <SafeAreaView style={styles.screen}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
  },
});
export default AppView;
