import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import primary from "../config/colors/primaryColor";
import neutral from "../config/colors/neutralColor";
import label from "../config/label";

function EnterButton({ title, onPress, color = primary.p900 }) {
	return (
		<TouchableOpacity
			style={[styles.button, { backgroundColor: color }]}
			onPress={onPress}
		>
			<Text style={styles.text}>{title}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: primary.p900,
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
		padding: 15,
		width: "100%",
		marginVertical: 10,
	},
	text: {
		color: "#fff",
		fontSize: 18,
		textTransform: "uppercase",
		fontWeight: "bold",
	},
});

export default EnterButton;
