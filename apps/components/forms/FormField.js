import React from "react";
import { useFormikContext } from "formik";
import { StyleSheet } from "react-native";

import AppTextInput from "../AppTextInput";
import AppText from "../Text";
import ErrorMessage from "./ErrorMessage";
import neutral from "../../config/colors/neutralColor";
import label from "../../config/label";

function AppFormField({ title, name, width, ...otherProps }) {
	const { setFieldTouched, setFieldValue, errors, touched, values } =
		useFormikContext();

	return (
		<>
			<AppText style={styles.title}>{title}</AppText>
			<AppTextInput
				onBlur={() => setFieldTouched(name)}
				onChangeText={(text) => setFieldValue(name, text)}
				value={values[name]}
				width={width}
				{...otherProps}
			/>
			<ErrorMessage error={errors[name]} visible={touched[name]} />
		</>
	);
}

const styles = StyleSheet.create({
	title: {
		alignSelf: "flex-start",
		marginBottom: 4,
		color: neutral.n950,
		...label.l3b,
	},
});

export default AppFormField;
