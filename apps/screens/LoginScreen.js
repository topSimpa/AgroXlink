import React from "react";
import { StyleSheet } from "react-native";
import neutral from "../config/colors/neutralColor";

function LoginScreen() {
  return (
    <Screen style={styles.screen}>
      <Brand color={primary.p900}></Brand>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: neutral.background,
  },
});
export default LoginScreen;
