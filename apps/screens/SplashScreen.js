import React from "react";
import { View, StyleSheet } from "react-native";

import AppText from "../components/AppText";
import primary from "../config/primaryColor";
import neutral from "../config/neutralColor";

function SplashScreen() {
  return (
    <View style={styles.background}>
      <AppText style={styles.brand}>AgroXlink</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    alignItems: "center",
    backgroundColor: primary.p900,
    display: "flex",
    height: "100%",
    justifyContent: "center",
    weight: "semi-bold",
    width: "100%",
  },

  brand: {
    color: neutral.white,
  },
});

export default SplashScreen;
