import React, { useState, useEffect } from "react";
import {
	Image,
	ImageBackground,
	StyleSheet,
	TouchableOpacity,
	Text,
	View,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Octicons from "@expo/vector-icons/Octicons";
import * as ImagePicker from "expo-image-picker";

import BackButton from "../components/BackButton";
import Screen from "../components/Screen";
import header from "../config/header";
import neutral from "../config/colors/neutralColor";
import label from "../config/label";
import primary from "../config/colors/primaryColor";
import { UserService } from "../services/UserService";
import { formatAddress } from "../utils/addressUtil";
import User from "../models/user";
import useAuth from "../auth/useAuth";
import { useUser } from "../user/context";
import { useRoute } from "@react-navigation/native";
import ActivityIndicator from "../components/ActivityIndicator";

const userService = new UserService();

function ProfileScreen({ navigation }) {
	const route = useRoute();
	const { state, dispatch } = useUser();
	const { userData, loading, error } = state;

	if (loading || !userData) {
		return <ActivityIndicator size="large" color="#0000ff" />; // Loading indicator
	}

	// Default values for userData properties
	const address = userData?.address ? formatAddress(userData.address) : "N/A";
	const name = userData?.name || "N/A";
	const bio = userData?.bio || "N/A";
	const phoneNumber = userData?.phoneNumber || "N/A";
	const detail = userData?.detail || "N/A";
	const imageUrl = userData?.imageUrl
		? { uri: userData.imageUrl }
		: require("../assets/person.png");

	const backgroundUrl = userData?.backgroundUrl
		? { uri: userData.backgroundUrl }
		: require("../assets/pbackground.png");

	return (
		<Screen style={styles.screen}>
			<View style={styles.profileHeader}>
				<ImageBackground
					source={{ backgroundUrl }}
					style={{
						width: "100%",
						height: 178,
					}}
				>
					<BackButton
						onPress={() => navigation.goBack()}
						style={{
							backgroundColor: "rgba(26, 28, 18, 0.6)",
							borderRadius: 20,
							marginTop: 16,
						}}
						color={neutral.white}
					/>
					<View
						style={{
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
						}}
					>
						<Image
							source={imageUrl}
							style={{ width: "100%", height: "100%" }}
						/>
					</View>
				</ImageBackground>
				<View style={styles.editContainer}>
					<TouchableOpacity
						style={styles.editButton}
						onPress={() => navigation.navigate("editProfile")}
					>
						<Text style={{ color: primary.p900, ...label.l4b }}>
							Edit Profile
						</Text>
					</TouchableOpacity>
				</View>
			</View>
			<View style={styles.profileDetails}>
				<View style={styles.basicInfo}>
					<View style={styles.nameEmail}>
						<Text style={{ ...header.h3 }}>{name}</Text>
						<Text style={{ ...label.l2r, color: neutral.n500 }}>{name}</Text>
					</View>
					<Text style={{ ...label.l2r, color: neutral.n900 }}>{bio}</Text>
				</View>
				<View style={styles.contactBox}>
					<View style={styles.contactHeader}>
						<Text
							style={{ marginBottom: 20, ...header.h4, color: neutral.n950 }}
						>
							{detail}
						</Text>
					</View>
					<View style={styles.contactDetails}>
						<View style={styles.contactItems}>
							<MaterialIcons name="phone-android" size={16} />
							<Text style={{ ...label.l2r, color: neutral.n950 }}>
								{phoneNumber}
							</Text>
						</View>
						<View style={styles.contactItems}>
							<Octicons name="location" size={16} />
							<Text style={{ ...label.l2r, color: neutral.n950 }}>
								{address}
							</Text>
						</View>
					</View>
				</View>
			</View>
		</Screen>
	);
}

const styles = StyleSheet.create({
	screen: {
		backgroundColor: neutral.background,
	},

	profileHeader: {
		width: "100%",
		height: 256,
		marginBottom: 32,
	},

	profileBackground: {
		width: "100%",
		height: 206,
	},

	profileDetails: {
		marginHorizontal: 16,
	},

	editButton: {
		marginRight: 17,
		marginTop: 12,
		height: 28,
		borderColor: primary.p900,
		borderWidth: 1,
		borderRadius: 8,
		justifyContent: "center",
		paddingHorizontal: 8,
	},

	editContainer: {
		flexDirection: "row",
		justifyContent: "flex-end",
	},

	nameEmail: {
		marginBottom: 16,
	},

	basicInfo: {
		borderBottomColor: neutral.n100,
		borderBottomWidth: 1,
		paddingBottom: 30,
		marginBottom: 30,
	},

	contactDetails: {
		gap: 16,
	},

	contactItems: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
});
export default ProfileScreen;
