import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

import neutral from "../config/colors/neutralColor";
import primary from "../config/colors/primaryColor";
import body from "../config/body";
import label from "../config/label";

function MixedQuestion({ first, second, style, onPress }) {
	return (
		<View style={[styles.container, style]}>
			<Text style={styles.firstText}>{first} </Text>
			<TouchableOpacity onPress={onPress}>
				<Text style={styles.secondText}>{second}</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
	},
	firstText: {
		color: neutral.n700,
		...body.p2r,
	},
	secondText: {
		color: primary.p950,
		...label.l3b,
	},
});

export default MixedQuestion;
