import React from "react";
import { Image, StyleSheet, View } from "react-native";

function BackButton() {
  return (
    <View style={styles.arrowContainer}>
      <Image
        style={styles.arrow}
        source={require("../assets/left-arrow.png")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  arrowContainer: {
    width: "100%",
    height: 56,
    justifyContent: "center",
    paddingLeft: 16,
  },
  arrow: {
    height: 24,
    width: 24,
  },
});
export default BackButton;
