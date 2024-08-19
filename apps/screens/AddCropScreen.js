import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import DropDownPicker from "react-native-dropdown-picker";
import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import neutral from "../config/colors/neutralColor";
import body from "../config/body";
import label from "../config/label";
import AppTextInput from "../components/AppTextInput";
import EnterButton from "../components/EnterButton";
import header from "../config/header";
import { CropService } from "../services/CropService";
import primary from "../config/colors/primaryColor";

function AddCropScreen() {
	const navigation = useNavigation();
	const route = useRoute();
	const { userId } = route.params;
	console.log("userId ->", userId);

	const [open, setOpen] = useState(false);
	const [value, setValue] = useState("");
	const [cropName, setCropName] = useState("");
	const [items, setItems] = useState([
		{ label: "Cereals", value: "Cereals" },
		{ label: "Vegetables", value: "Vegetables" },
		{ label: "Legumes", value: "Legumes" },
		{ label: "Fiber", value: "Fiber" },
	]);

	const handleAddCrop = async () => {
		if (!cropName || !value) {
			Alert.alert("Error", "Please fill in all fields.");
			return;
		}

		try {
			const cropService = new CropService();
			await cropService.create({
				name: cropName,
				category: value,
				userId: userId, // Associate crop with user
			});
			Alert.alert("Success", "Crop added successfully.");
			navigation.navigate("myCropScreen", { refresh: true });
		} catch (error) {
			Alert.alert("Error", "There was an error adding the crop.");
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.addForm}>
				<View style={styles.formHeader}>
					<Text style={{ color: "black", ...header.h4 }}>Add new crop</Text>
					<TouchableOpacity onPress={() => navigation.goBack()}>
						<Ionicons name={"close"} color={neutral.n950} size={24} />
					</TouchableOpacity>
				</View>
				<AppTextInput
					title="Crop Name"
					placeholder="Red Onion"
					style={{ marginBottom: 18 }}
					value={cropName}
					onChangeText={setCropName}
				/>

				<View style={styles.Catcontainer}>
					<Text style={styles.title}>Crop Category</Text>
					<DropDownPicker
						open={open}
						value={value}
						items={items}
						setOpen={setOpen}
						setValue={setValue}
						setItems={setItems}
						style={styles.dropDown}
						placeholder="Select a category"
						placeholderStyle={styles.placeholder}
						dropDownContainerStyle={styles.dropDownContainer}
					/>
				</View>

				<EnterButton
					text={"Add Crop"}
					style={{ marginTop: 32 }}
					onPress={handleAddCrop}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	addForm: {
		position: "absolute",
		bottom: 0,
		height: "45%",
		backgroundColor: neutral.background,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		paddingBottom: 52,
		paddingTop: 20,
		paddingHorizontal: 16,
		width: "100%",
	},

	container: {
		width: "100%",
		height: "100%",
		backgroundColor: "rgba(118, 119, 116, 0.6)",
		position: "absolute",
		top: 0,
	},

	formHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 18,
	},

	dropDownContainerStyle: {
		width: "100%",
		height: 66,
		backgroundColor: neutral.background,
	},
	dropDown: {
		width: "100%",
		height: 48,
		borderRadius: 10,
		borderColor: neutral.n100,
		borderStyle: "solid",
		borderWidth: 1,
		padding: 12,
		backgroundColor: neutral.background,
	},

	placeholder: {
		color: neutral.n300,
		...body.p2r,
	},

	title: {
		marginBottom: 4,
		color: neutral.n950,
		...label.l3b,
	},
});
export default AddCropScreen;
