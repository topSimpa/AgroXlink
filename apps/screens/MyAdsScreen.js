import React, { useState, useEffect } from "react";
import AddButton from "../components/AddButton";
import {
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Alert,
} from "react-native";

import Screen from "../components/Screen";
import AdsItem from "../components/AdsItem";
import ScreenHeader from "../components/ScreenHeader";
import SearchBar from "../components/SearchBar";
import neutral from "../config/colors/neutralColor";
import ProductService from "../services/ProductService";
import useAuth from "../auth/useAuth";

import { useRoute, useIsFocused } from "@react-navigation/native";

function MyAdsScreen({ navigation, routes }) {
	const route = useRoute();
	const isFocused = useIsFocused();

	const { user } = useAuth();
	const [products, setProducts] = useState([]);
	const productService = new ProductService();

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				if (user.id) {
					const userProducts = await productService.getByUserId(user.id); //implement function
					setProducts(userProducts);
				}
			} catch (error) {
				console.error("Error fetching crops:", error);
			}
		};

		if (isFocused) {
			fetchProducts(); // Fetch crops whenever the screen is focused
		}
	}, [isFocused]);
	// Function to handle crop deletion
	const handleDeleteProduct = async (productId) => {
		try {
			await productService.delete(productId);
			setProducts(products.filter((product) => product.id !== productId));
			Alert.alert("Success", "Product deleted successfully.");
			// Update UI
		} catch (error) {
			Alert.alert("Error", "There was an error deleting the product.");
		}
	};

	console.log(products);

	return (
		<Screen style={{ backgroundColor: neutral.background }}>
			<ScreenHeader title="My Ads" onPress={() => navigation.goBack()} />
			<SearchBar placeholder="Search" style={styles.search} />
			<View style={{ backgroundColor: neutral.background, flex: 1 }}>
				<FlatList
					data={products}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => (
						<AdsItem
							name={item.crop}
							farmName={item.farmName}
							cropType={item.cropType}
							price={item.price}
							quantity={item.quantity}
							imageUrl={item.imageUrl}
							onDelete={() => handleDeleteProduct(item.id)}
						/>
					)}
					ItemSeparatorComponent={() => (
						<View style={{ height: 8, width: "100%" }} />
					)}
				/>
			</View>
			<TouchableOpacity
				style={styles.add}
				onPress={() => navigation.navigate("addSell")}
			>
				<AddButton></AddButton>
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
});
export default MyAdsScreen;
