import { Image, View, StyleSheet, Button } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

import neutral from "../config/colors/neutralColor";
import error from "../config/colors/error";
import primary from "../config/colors/primaryColor";
import { auth } from "../firebaseSetup";

function MenuHeader({ children, image }) {
	const navigation = useNavigation();

	const handleLogout = async () => {
		try {
			await signOut(auth);
			console.log("User logged out successfully");

			navigation.navigate("Login");
		} catch (error) {
			console.error("Error logging out:", error);
		}
	};

	// // Temporary trigger to log out the user (for testing purposes)
	useEffect(() => {
		// Call the logout function here
		if (user) {
			handleLogout();
		}
	}, [user]);

	return (
		<View style={styles.headerContainer}>
			<View style={styles.header}>
				<Image source={image} />
				<View style={StyleSheet.nameContainer}>{children}</View>
				<Button title="Logout" onPress={handleLogout}></Button>
				<View style={styles.bellContainer}>
					<Ionicons
						name="notifications-outline"
						size={24}
						color={neutral.white}
					/>
					<View
						style={{
							backgroundColor: error.r900,
							width: 6,
							height: 6,
							borderRadius: 3,
							position: "absolute",
							top: 10,
							right: 12,
						}}
					/>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	bellContainer: {
		backgroundColor: primary.p900,
		borderRadius: 20,
		flexDirection: "row",
		height: 40,
		width: 40,
		justifyContent: "center",
		alignItems: "center",
	},

	nameContainerContainer: {
		height: 40,
		alignItems: "center",
	},

	headerContainer: {
		width: "100%",
		paddingHorizontal: 16,
		paddingVertical: 14,
		borderBottomWidth: 1,
		borderColor: neutral.n100,
	},

	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		position: "static",
		top: 0,
	},
});

export default MenuHeader;
