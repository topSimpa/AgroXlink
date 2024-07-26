import React from "react";
import { TouchableOpacity } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

import neutral from "../config/colors/neutralColor";

function BackButton({ onPress }) {
	return (
		<TouchableOpacity onPress={onPress} activeOpacity={0.7}>
			<FontAwesome6 name="arrow-left-long" size={24} color={neutral.n950} />
		</TouchableOpacity>
	);
}

export default BackButton;
