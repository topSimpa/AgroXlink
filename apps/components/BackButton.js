import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

import neutral from "../config/colors/neutralColor";

function BackButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.back}>
      <FontAwesome6 name="arrow-left-long" size={24} color={neutral.n950} />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  back: {
    position: "absolute",
    left: 16,
    alignItem: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
  },
});
export default BackButton;
