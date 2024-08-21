import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import {
	ImageBackground,
	ScrollView,
	StyleSheet,
	View,
	TouchableOpacity,
	Text,
} from "react-native";

import AppTextInput from "../components/AppTextInput";
import EnterButton from "../components/EnterButton";
import Screen from "../components/Screen";
import ScreenHeader from "../components/ScreenHeader";
import neutral from "../config/colors/neutralColor";
import ImageInput from "../components/ImageInput";
import { uploadImage } from "../utils/uploadImage";
import { useUser } from "../user/context";
import { UserService } from "../services/UserService";

const userService = new UserService();

function EditProfileScreen({ navigation }) {
	const { state, dispatch } = useUser(); // Access global user data and dispatch from the context
	const { userData } = state;

	// Local state for editable fields
	const [image, setImage] = useState(userData?.imageUrl || null);
	const [background, setBackground] = useState(userData?.backgroundUrl || null);
	const [showOptions, setShowOptions] = useState(false);
	const [currentSetter, setCurrentSetter] = useState(null);
	const [name, setName] = useState(userData?.name || "");
	const [email, setEmail] = useState(userData?.email || "");
	const [bio, setBio] = useState(userData?.bio || "");
	const [phoneNumber, setPhoneNumber] = useState(userData?.phoneNumber || "");
	const [address, setAddress] = useState({
		street: userData?.address?.street || "",
		city: userData?.address?.city || "",
		state: userData?.address?.state || "",
	});

	const requestPermissions = async () => {
		const { status: mediaStatus } =
			await ImagePicker.requestMediaLibraryPermissionsAsync();
		const { status: cameraStatus } =
			await ImagePicker.requestCameraPermissionsAsync();
		if (mediaStatus !== "granted" || cameraStatus !== "granted") {
			alert(
				"Sorry, we need media library and camera permissions to make this work!"
			);
			return false;
		}
		return true;
	};

	const pickImage = async (useCamera = false) => {
		if (!(await requestPermissions())) return;

		let result;
		if (useCamera) {
			result = await ImagePicker.launchCameraAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.All,
				allowsEditing: true,
				aspect: [4, 3],
				quality: 1,
			});
		} else {
			result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.All,
				allowsEditing: true,
				aspect: [4, 3],
				quality: 1,
			});
		}

		if (!result.canceled) {
			if (currentSetter === "background") {
				setBackground(result.assets[0].uri);
			} else if (currentSetter === "image") {
				setImage(result.assets[0].uri);
			}
			setShowOptions(false);
		}
	};

	const openOptions = (setter) => {
		setCurrentSetter(setter);
		setShowOptions(true);
	};

	const handleSubmit = async () => {
		try {
			let imageUrl = image;
			let backgroundUrl = background;

			// Upload image if it's new
			if (image && image !== userData.imageUrl) {
				imageUrl = await uploadImage(image, "profile_pictures", userData.id);
			}

			// Upload background if it's new
			if (background && background !== userData.backgroundUrl) {
				backgroundUrl = await uploadImage(
					background,
					"backgrounds",
					userData.id
				);
			}

			// Update user data to be sent to backend
			const updatedUserData = {
				name,
				email,
				bio,
				phoneNumber,
				address: {
					street: address.street,
					city: address.city,
					state: address.state,
				},
				imageUrl,
				backgroundUrl,
			};

			// Use UserService to update user in the backend
			await userService.update(userData.id, updatedUserData);

			// Dispatch action to update user data globally
			dispatch({ type: "SET_USER", payload: updatedUserData });

			alert("Profile updated successfully!");
			navigation.navigate("myProfile", { refresh: true });
		} catch (error) {
			console.error("Error updating user data: ", error);
			alert("Failed to update profile. Please try again.");
		}
	};

	return (
		<Screen>
			<ScreenHeader title="Edit Profile" onPress={() => navigation.goBack()} />
			<ScrollView>
				<View style={styles.photoSelectionBox}>
					<ImageBackground
						source={
							background
								? { uri: background }
								: require("../assets/pbackground.png")
						}
						style={{
							width: "100%",
							height: 178,
						}}
					>
						<TouchableOpacity onPress={() => openOptions("background")}>
							<ImageInput />
						</TouchableOpacity>

						<View style={styles.profileImageContainer}>
							<ImageBackground
								source={
									image ? { uri: image } : require("../assets/person.png")
								}
								style={styles.profileImage}
							>
								<TouchableOpacity onPress={() => openOptions("image")}>
									<ImageInput />
								</TouchableOpacity>
							</ImageBackground>
						</View>
					</ImageBackground>
				</View>

				{showOptions && (
					<View style={styles.optionsContainer}>
						<TouchableOpacity
							style={styles.optionButton}
							onPress={() => pickImage(false)}
						>
							<Text style={styles.optionText}>Choose from Gallery</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.optionButton}
							onPress={() => pickImage(true)}
						>
							<Text style={styles.optionText}>Take a Photo</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.optionButton}
							onPress={() => setShowOptions(false)}
						>
							<Text style={styles.optionText}>Cancel</Text>
						</TouchableOpacity>
					</View>
				)}

				<View style={styles.form}>
					<AppTextInput
						title={"Name"}
						placeholder={"Abdulmujeeb Mohammed"}
						value={name}
						onChangeText={setName}
					/>
					<AppTextInput
						title={"Email"}
						placeholder={"dummy@domain.com"}
						value={email}
						onChangeText={setEmail}
					/>
					<AppTextInput
						title={"Bio"}
						placeholder={"I love farming beans"}
						value={bio}
						onChangeText={setBio}
					/>
					<AppTextInput
						title={"Phone Number"}
						placeholder={"090123456734"}
						value={phoneNumber}
						onChangeText={setPhoneNumber}
					/>
					<AppTextInput
						title={"Street"}
						placeholder=""
						value={address.street}
						onChangeText={(text) =>
							setAddress((prev) => ({ ...prev, street: text }))
						}
					/>
					<AppTextInput
						title={"City"}
						placeholder=""
						value={address.city}
						onChangeText={(text) =>
							setAddress((prev) => ({ ...prev, city: text }))
						}
					/>
					<AppTextInput
						title={"State"}
						placeholder=""
						value={address.state}
						onChangeText={(text) =>
							setAddress((prev) => ({ ...prev, state: text }))
						}
					/>
					<EnterButton text={"Update Profile"} onPress={handleSubmit} />
				</View>
			</ScrollView>
		</Screen>
	);
}

const styles = StyleSheet.create({
	form: {
		marginHorizontal: 16,
		gap: 16,
		marginVertical: 42,
	},
	photoSelectionBox: {
		width: "100%",
		height: 228,
		overflow: "hidden",
	},
	optionsContainer: {
		margin: 16,
		borderRadius: 8,
		backgroundColor: "white",
		padding: 16,
		elevation: 4,
	},
	optionButton: {
		padding: 10,
		backgroundColor: "#f0f0f0",
		borderRadius: 8,
		marginVertical: 8,
	},
	optionText: {
		fontSize: 16,
		textAlign: "center",
	},
	screen: {
		backgroundColor: neutral.background,
	},
	profileImageContainer: {
		width: 97,
		height: 100,
		position: "absolute",
		top: 128,
		left: 20,
		borderWidth: 3,
		borderBottomWidth: 0,
		borderColor: "white",
		borderRadius: 100,
		overflow: "hidden",
	},
});

export default EditProfileScreen;
