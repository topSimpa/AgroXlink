import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import error from "../config/colors/error";
import neutral from "../config/colors/neutralColor";
import label from "../config/label";
import body from "../config/body";
import header from "../config/header";

function AdsItem({
	name,
	cropType,
	farmName,
	price,
	quantity,
	imageUrl,
	onDelete,
}) {
	return (
		<View style={styles.ItemBox}>
			<View style={styles.nameBox}>
				<View style={{ width: 74, height: 74 }}>
					<Image style={{ width: 50, height: 74 }} source={{ uri: imageUrl }} />
				</View>
				<View style={styles.textBox}>
					<Text style={{ color: neutral.n950, ...label.l2b }}>{name}</Text>
					<Text style={{ color: neutral.n600, ...body.p2r }}>{farmName}</Text>
					<Text style={{ color: neutral.n950, ...header.h40 }}>
						{price}{" "}
						<Text style={{ color: neutral.n500, ...body.p3r }}>
							Per {quantity}
						</Text>
					</Text>
				</View>
			</View>
			<TouchableOpacity onPress={onDelete}>
				<MaterialIcons name="delete-outline" color={error.r600} size={24} />
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	ItemBox: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 20,
		gap: 8,
	},

	nameBox: {
		flexDirection: "row",
		justifyContent: "space-between",
	},

	textBox: { gap: 8 },
});
export default AdsItem;
