import { Image, View, StyleSheet, Button, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

import neutral from "../config/colors/neutralColor";
import header from "../config/header";
import error from "../config/colors/error";
import primary from "../config/colors/primaryColor";
import { auth } from "../firebaseSetup";
import useAuth from "../auth/useAuth";
import { useUser } from "../user/context";
import { TouchableOpacity } from "react-native-gesture-handler";
import { UserService } from "../services/UserService";

function MenuHeader({ color, title, image }) {
	const { user } = useAuth();
	const navigation = useNavigation();

	return (
		<View style={styles.headerContainer}>
			<View style={styles.header}>
				<TouchableOpacity onPress={() => navigation.openDrawer()}>
					<Image source={image} />
				</TouchableOpacity>
				<View style={StyleSheet.nameContainer}>
					<Text style={{ color: color, ...header.h4 }}>{title}</Text>
				</View>

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
