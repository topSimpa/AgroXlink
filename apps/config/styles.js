import { Platform } from "react-native";

export default {
	text: {
		color: "#000",
		fontSize: 18,
		fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
	},
};
