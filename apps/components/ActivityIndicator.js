import React from "react";
import LottieView from "lottie-react-native";
import { View, StyleSheet } from "react-native";

function ActivityIndicator({ visible = false }) {
	if (!visible) return null;

	return (
		<View style={styles.overlay}>
			<LottieView
				autoPlay
				loop
				style={{
					width: 200,
					height: 200,
				}}
				source={require("../assets/animations/loader.json")}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
		backgroundColor: "white",
		height: "100%",
		opacity: 0.8,
		width: "100%",
		zIndex: 1,
	},
});

export default ActivityIndicator;
