import React from "react";
import { useFormikContext } from "formik";
import { StyleSheet, View, Text } from "react-native";
import CheckBox from "../CheckBox";
import ErrorMessage from "./ErrorMessage";
import neutral from "../../config/colors/neutralColor";
import label from "../../config/label";

function AppFormCheckbox({ title, name }) {
	const { setFieldValue, errors, touched, values } = useFormikContext();

	const handleToggle = () => {
		setFieldValue(name, !values[name]);
	};

	return (
		<View style={styles.container}>
			<CheckBox isChecked={values[name]} onToggle={handleToggle} />
			<Text style={styles.title}>{title}</Text>
			<ErrorMessage error={errors[name]} visible={touched[name]} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 10,
	},
	title: {
		marginLeft: 8,
		color: neutral.n950,
		...label.l3b,
	},
});

export default AppFormCheckbox;
