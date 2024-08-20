import React, { useEffect, useState } from "react";
import {
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Alert,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import DropDownPicker from "react-native-dropdown-picker";
import * as ImagePicker from "expo-image-picker";

import neutral from "../config/colors/neutralColor";
import body from "../config/body";
import label from "../config/label";
import AppTextInput from "../components/AppTextInput";
import EnterButton from "../components/EnterButton";
import header from "../config/header";
import primary from "../config/colors/primaryColor";
import ImageInput from "../components/ImageInput";
import { uploadImage } from "../utils/uploadImage";
import ProductService from "../services/ProductService";
import useAuth from "../auth/useAuth";
import { CropService } from "../services/CropService";

function AddSellScreen({ navigation }) {
	const [openCategory, setOpenCategory] = useState(false);
	const [valueCategory, setValueCategory] = useState(null);
	const [selectedCategory, setSelectedCategory] = useState([
		{ label: "Beverages", value: "beverages" },
		{ label: "Cereals", value: "cereals" },
		{ label: "Fibres", value: "fibres" },
		{ label: "Fruits", value: "fruits" },
		{ label: "Legumes", value: "legumes" },
		{ label: "Spices", value: "spices" },
		{ label: "Tubers", value: "tubers" },
		{ label: "Vegetables", value: "vegetables" },
	]);
	const [openQuantity, setOpenQuantity] = useState(false);
	const [valueQuantity, setValueQuantity] = useState(null);
	const [selectedQuantity, setSelectedQuantity] = useState([
		{ label: "Basket", value: "basket" },
		{ label: "Bag", value: "bag" },
		{ label: "Stack", value: "stack" },
	]);

	const [openCrop, setOpenCrop] = useState(false); // New state for crop dropdown
	const [valueCrop, setValueCrop] = useState(null);
	const [selectedCrop, setSelectedCrop] = useState(null); // New state for selected crop

	const [price, setPrice] = useState("");
	const [image, setImage] = useState(null);
	const [farmName, setFarmName] = useState("");
	const [description, setDescription] = useState("");
	const { user } = useAuth();

	const productService = new ProductService();
	const cropService = new CropService();

	// Fetch user crops on component mount
	useEffect(() => {
		const fetchCrops = async () => {
			try {
				const userCrops = await cropService.getByUserId(user.id);
				const cropOptions = userCrops.map((crop) => ({
					label: crop.name, // assuming crop.name is the crop title
					value: crop.id, // assuming crop.id is the unique identifier for the crop
				}));
				setSelectedCrop(cropOptions);
			} catch (error) {
				Alert.alert("Error", "Could not fetch crops. Please try again.");
				console.error("Error fetching crops:", error);
			}
		};

		fetchCrops();
	}, [user.id]);

	const handlePostAd = async () => {
		if (
			!valueCrop ||
			!price ||
			!valueQuantity ||
			!valueCategory ||
			!farmName ||
			!description ||
			!image
		) {
			Alert.alert("Please fill in all fields");
			return;
		}
		console.log("chelsea", valueCrop);

		try {
			const selectedCropLabel = selectedCrop.find(
				(crop) => crop.value === valueCrop
			)?.label;
			const newProduct = {
				crop: selectedCropLabel, // Use selectedCrop instead of title
				price: Number(price),
				farmName: farmName,
				description: description,
				quantity: valueQuantity,
				cropType: valueCategory, // Include the selected category
				userId: user.id, // Ensure this is the logged-in user's ID
			};

			const productId = await productService.create(newProduct);
			console.log(productId);

			const imageUrl = await uploadImage(image, "products", productId);

			await productService.update(productId, { imageUrl });

			Alert.alert("Success", "Your ad has been posted!");
			navigation.goBack();
		} catch (error) {
			Alert.alert("Error", "Could not post the ad. Please try again.");
			console.error("Error posting ad:", error);
		}
	};

	const pickImage = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.addPage}>
				<View style={styles.form}>
					<View style={styles.formHeader}>
						<Text style={{ color: "black", ...header.h4 }}>Post New Ad</Text>
						<TouchableOpacity onPress={() => navigation.goBack()}>
							<Ionicons name={"close"} color={neutral.n950} size={24} />
						</TouchableOpacity>
					</View>
					<View style={styles.imageUploadBox}>
						<View>
							<Text style={styles.instruction}>
								Add at least 2 pictures of the product.
							</Text>
							<Text style={styles.instruction}>Size should not exceed 5MB</Text>
						</View>
						<View style={styles.imageBox}>
							{image && <Image source={{ uri: image }} />}
							<View style={styles.addImageButton}>
								<ImageInput
									show={false}
									onPress={pickImage}
									style={{ backgroundColor: primary.p100 }}
								>
									<FontAwesome6 name={"plus"} color={neutral.p900} size={20} />
								</ImageInput>
							</View>
						</View>
					</View>
					<View style={styles.form}>
						<View>
							<Text style={styles.title}>Crops</Text>
							<DropDownPicker
								open={openCrop} // Use the correct state
								value={valueCrop} // Use the correct state
								items={selectedCrop || []}
								setOpen={setOpenCrop} // Use the correct setter
								setValue={setValueCrop} // Use the correct setter
								setItems={setSelectedCrop}
								style={styles.dropDown}
								placeholder="Select a crop"
								placeholderStyle={styles.placeholder}
								dropDownContainerStyle={styles.dropDownContainerStyle}
							/>
						</View>
						<AppTextInput
							title="Price"
							placeholder="169"
							value={price}
							onChangeText={setPrice}
						/>

						<AppTextInput
							title="Farm Name"
							placeholder="Orchard view farm"
							value={farmName}
							onChangeText={setFarmName}
						/>

						<AppTextInput
							title="Description"
							placeholder="Discover the rich, earthly flavour of our ......"
							value={description}
							onChangeText={setDescription}
						/>

						<View>
							<Text style={styles.title}>Category</Text>
							<DropDownPicker
								open={openCategory}
								value={valueCategory}
								items={selectedCategory || []}
								setOpen={setOpenCategory}
								setValue={setValueCategory}
								setItems={setSelectedCategory}
								style={styles.dropDown}
								placeholder="Select Category"
								placeholderStyle={styles.placeholder}
								dropDownContainerStyle={styles.dropDownContainerStyle}
							/>
						</View>
						<View>
							<Text style={styles.title}>Quantity</Text>
							<DropDownPicker
								open={openQuantity} // Use the correct state
								value={valueQuantity} // Use the correct state
								items={selectedQuantity || []} // Changed to use quantityOptions
								setOpen={setOpenQuantity} // Use the correct setter
								setValue={setValueQuantity} // Use the correct setter
								setItems={setSelectedQuantity} // Not modifying quantityOptions
								style={styles.dropDown}
								placeholder="Select Quantity"
								placeholderStyle={styles.placeholder}
								dropDownContainerStyle={styles.dropDownContainerStyle}
							/>
						</View>
					</View>
				</View>
				<EnterButton
					text={"Post Ad"}
					style={{ marginTop: 32 }}
					onPress={handlePostAd}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	addImageButton: {
		width: 50,
		height: 50,
		backgroundColor: primary.p100,
		justifyContent: "center",
		alignItems: "center",
	},

	addPage: {
		position: "absolute",
		bottom: 0,
		height: "80%",
		backgroundColor: neutral.background,
		borderTopLeftRadius: 10,	
		borderTopRightRadius: 10,
		paddingBottom: 52,
		paddingTop: 20,
		paddingHorizontal: 16,
		width: "100%",
	},
	instruction: {
		color: neutral.n700,
		...label.l2r,
	},

	container: {
		width: "100%",
		height: "100%",
		backgroundColor: "rgba(118, 119, 116, 0.6)",
		position: "absolute",
		top: 0,
	},

	form: {
		gap: 9,
	},

	formHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
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

	imageBox: {
		flexDirection: "row",
		width: "100%",
		height: 50,
		gap: 8,
	},
	imageUploadBox: {
		gap: 9,
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

export default AddSellScreen;
