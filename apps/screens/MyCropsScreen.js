import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	TouchableOpacity,
	View,
	FlatList,
	Text,
	Alert,
} from "react-native";
import Screen from "../components/Screen";
import ScreenHeader from "../components/ScreenHeader";
import SearchBar from "../components/SearchBar";
import neutral from "../config/colors/neutralColor";
import AddButton from "../components/AddButton";
import { CropService } from "../services/CropService";
import useAuth from "../auth/useAuth";
import { Crop } from "../models/crop"; // Make sure Crop is imported correctly
import CropTabNavigator from "../navigation/CropTabNavigator";
import { useRoute, useIsFocused } from "@react-navigation/native";
import CropItems from "../components/CropItems";

function MyCropsScreen({ navigation, routes }) {
	const route = useRoute();
	const isFocused = useIsFocused();

	const { user } = useAuth();
	const [crops, setCrops] = useState([]);
	const cropService = new CropService();

	useEffect(() => {
		const fetchCrops = async () => {
			try {
				if (user.id) {
					const userCrops = await cropService.getByUserId(user.id);
					setCrops(userCrops);
				}
			} catch (error) {
				console.error("Error fetching crops:", error);
			}
		};

		if (isFocused) {
			fetchCrops(); // Fetch crops whenever the screen is focused
		}
	}, [isFocused]);
	// Function to handle crop deletion
	const handleDeleteCrop = async (cropId) => {
		try {
			await cropService.delete(cropId);
			setCrops(crops.filter((crop) => crop.id !== cropId));
			Alert.alert("Success", "Crop deleted successfully.");
			// Update UI
		} catch (error) {
			Alert.alert("Error", "There was an error deleting the crop.");
		}
	};

	console.log(crops);
	return (
		<Screen style={{ backgroundColor: neutral.background }}>
			<ScreenHeader title="My Crops" onPress={() => navigation.goBack()} />
			<SearchBar placeholder="Search" style={styles.search} />
			{/* <CropTabNavigator></CropTabNavigator> */}
			<FlatList
				data={crops}
				keyExtractor={(item) => item.id || ""}
				renderItem={({ item }) => (
					<CropItems
						name={item.name}
						key={item.index}
						onDelete={() => handleDeleteCrop(item.id)}
					/>
				)}
				ItemSeparatorComponent={() => (
					<View
						style={{ borderBottomWidth: 1, borderBottomColor: neutral.n100 }}
					/>
				)}
			/>
			<TouchableOpacity
				style={styles.add}
				onPress={() => navigation.navigate("addCrop", { userId: user.id })} // Pass userId correctly
			>
				<AddButton />
			</TouchableOpacity>
		</Screen>
	);
}

const styles = StyleSheet.create({
	add: {
		position: "absolute",
		right: 16,
		bottom: 54,
	},
	search: {
		marginVertical: 32,
	},
	cropItem: {
		padding: 16,
		borderBottomWidth: 1,
		borderBottomColor: neutral.n100,
	},
});

export default MyCropsScreen;
