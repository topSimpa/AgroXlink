import React from "react";
import { Text, StyleSheet, Platform } from "react-native";

function AppText({ children, style, ...otherProps }) {
	return (
		<Text style={[styles.text, style]} {...otherProps}>
			{children}
		</Text>
	);
}

const styles = StyleSheet.create({
	text: {
		alignSelf: "flex-start",
		color: "#000",
		fontSize: 18,
		margin: 4,
		fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
	},
});

export default AppText;
