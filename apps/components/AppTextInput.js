import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import neutral from "../config/colors/neutralColor";

function AppTextInput({ title, placeholder, style }) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
      <TextInput placeholder={placeholder} style={styles.input} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 66,
  },
  input: {
    width: "100%",
    height: 48,
    borderRadius: 10,
    borderColor: neutral.n100,
    borderStyle: "solid",
    borderWidth: 1,
    padding: 12,
    color: neutral.n300,
  },

  title: {
    marginBottom: 4,
    color: neutral.n950,
  },
});

export default AppTextInput;
