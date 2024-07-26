import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import primary from "../config/colors/primaryColor";
import neutral from "../config/colors/neutralColor";
import label from "../config/label";

function EnterButton({ text, style, ...otherProps }) {
  return (
    <TouchableOpacity style={[styles.button, style]} {...otherProps}>
      <Text style={{ color: neutral.white, ...label.l2b }}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: primary.p900,
		width: "100%",
		height: 50,
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
	},
});

export default EnterButton;
