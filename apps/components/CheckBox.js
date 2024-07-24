import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import primary from "../config/colors/primaryColor";
import { TouchableWithoutFeedback } from "react-native";

function CheckBox({ isChecked, onToggle }) {
	return (
		<TouchableWithoutFeedback onPress={onToggle}>
			<MaterialCommunityIcons
				name={isChecked ? "checkbox-outline" : "checkbox-blank-outline"}
				size={24}
				color={primary.p950}
			/>
		</TouchableWithoutFeedback>
	);
}

export default CheckBox;
