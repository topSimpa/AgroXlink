import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import neutral from "../config/colors/neutralColor";
import primary from "../config/colors/primaryColor";

function AddButton({ style }) {
  return (
    <View style={[styles.button, style]}>
      <FontAwesome6 name={"plus"} color={neutral.white} size={20} />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: primary.p900,
    borderRadius: 30,
    height: 60,
    justifyContent: "center",
    width: 60,
  },
});

export default AddButton;
