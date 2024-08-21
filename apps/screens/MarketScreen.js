import React, { useState, useEffect } from "react";
import {
	FlatList,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

import Brand from "../components/Brand";
import primary from "../config/colors/primaryColor";
import neutral from "../config/colors/neutralColor";
import Screen from "../components/Screen";
import CatItem from "../components/CatItem";
import header from "../config/header";
import label from "../config/label";
import ProduceDetails from "../components/ProduceDetails";
import MenuHeader from "../components/MenuHeader";
import SearchBar from "../components/SearchBar";
import ProductService from "../services/ProductService";
import { useUser } from "../user/context";

const categories = [
	{ name: "beverages", image: require("../assets/beverages.png") },
	{ name: "cereals", image: require("../assets/cereals.png") },
	{ name: "fibres", image: require("../assets/fibres.png") },
	{ name: "fruits", image: require("../assets/fruits.png") },
	{ name: "legumes", image: require("../assets/legumes.png") },
	{ name: "spices", image: require("../assets/spices.png") },
	{ name: "tubers", image: require("../assets/tubers.png") },
	{ name: "vegetables", image: require("../assets/vegetables.png") },
];

function MarketScreen() {
	const [selectedCategories, setSelectedCategories] = useState([]);
	const [produceList, setProduceList] = useState([]);
	const productService = new ProductService();

	const handleToggleCategory = (categoryName) => {
		setSelectedCategories((prevSelected) => {
			if (prevSelected.includes(categoryName)) {
				return prevSelected.filter((category) => category !== categoryName);
			} else {
				return [...prevSelected, categoryName];
			}
		});
	};

	// Fetch products based on selected categories
	useEffect(() => {
		const fetchProducts = async () => {
			try {
				if (selectedCategories.length === 0) {
					const allProducts = await productService.getAllProducts();
					setProduceList(allProducts);
				} else {
					const filteredProducts = await productService.getByMultipleCropTypes(
						selectedCategories
					);
					setProduceList(filteredProducts);
				}
			} catch (error) {
				console.error("Error fetching products: ", error);
			}
		};
		fetchProducts();
	}, [selectedCategories]);

	return (
		<View style={styles.screen}>
			<Screen>
				<MenuHeader
					image={require("../assets/Avatar.png")}
					color={primary.p900}
					title={"AgroXlink"}
				/>
				<ScrollView contentContainerStyle={styles.scrollview}>
					<SearchBar
						placeholder={"Search farm produce"}
						field={"produce"}
						onResults={(result) => setProduceList(result)}
					/>
					<FlatList
						style={styles.category}
						horizontal
						data={categories}
						keyExtractor={(categories) => categories.name}
						bounces={false}
						showsHorizontalScrollIndicator={false}
						renderItem={({ item }) => (
							<CatItem
								title={item.name}
								image={item.image}
								isSelected={selectedCategories.includes(item.name)}
								onToggleSelect={handleToggleCategory}
							/>
						)}
					/>
					<View style={styles.produceContainer}>
						<View style={styles.available}>
							<Text style={{ color: neutral.n900, ...header.h4 }}>
								Available Produce
							</Text>
							<TouchableOpacity
								style={{ borderBottomWidth: 1, borderColor: neutral.n600 }}
							>
								<Text style={{ color: neutral.n600, ...label.l3b }}>
									See All
								</Text>
							</TouchableOpacity>
						</View>
						<View style={styles.availableProduce}>
							{produceList.map((prod, index) => (
								<ProduceDetails
									key={index}
									name={prod.crop}
									farmName={prod.farmName}
									price={prod.price}
									unit={prod.quantity}
									image={prod.imageUrl}
									owner={prod.userId}
								/>
							))}
						</View>
					</View>
				</ScrollView>
			</Screen>
		</View>
	);
}

const styles = StyleSheet.create({
	available: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 16,
	},
	availableProduce: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
	},
	category: {
		marginBottom: 36,
	},
	screen: {
		backgroundColor: neutral.background,
	},
	scrollScreen: {
		alignItems: "center",
	},
	scrollview: {
		paddingBottom: 75,
		marginTop: 26,
	},
	produceContainer: {
		marginHorizontal: 16,
	},
});
export default MarketScreen;
