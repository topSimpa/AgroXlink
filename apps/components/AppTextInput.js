import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import neutral from "../config/colors/neutralColor";
import label from "../config/label";
import body from "../config/body";


function AppTextInput({ title, style, ...otherProps}) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
      <TextInput {...otherProps} style={styles.input} />
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
		...body.p2r,
	},

	title: {
		marginBottom: 4,
		color: neutral.n950,
		...label.l3b,
	},
});

export default AppTextInput;
