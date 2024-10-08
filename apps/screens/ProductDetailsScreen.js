import React, { useState, useEffect } from "react";
import {
	FlatList,
	Image,
	ImageBackground,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import body from "../config/body";
import label from "../config/label";
import primary from "../config/colors/primaryColor";
import neutral from "../config/colors/neutralColor";
import header from "../config/header";
import Screen from "../components/Screen";
import EnterButton from "../components/EnterButton";

import useAuth from "../auth/useAuth";
import { ChatService } from "../services/ChatService";
import { UserService } from "../services/UserService";

function ProductDetailsScreen({ route, navigation }) {
	const description =
		"Discover the rich, earthly flavor of our fresh I rish Potatoes, harvested directly from local farms to your table. These versatile... Read more";
	const reviewCount = 10;
	const [show, setShow] = useState(2);
	const [ownerId, setOwnerId] = useState(null);
	const [ownerName, setOwnerName] = useState(null);
	const [ownerImageUrl, setOwnerImageUrl] = useState(null);

	const { user } = useAuth();
	const productOwnerId = route.params.owner;

	console.log("userId _>", user.id);
	console.log("product owner _>", productOwnerId);

	const reviews = [
		{
			id: 1,
			ownerPics: "",
			ownerName: "Misturah Ali",
			title: "Best Potatoes I've Ever Bought!",
			time: "April 21, 2024",
			content:
				"I was a bit Skeptical about ordering fresh produce online, but these Irish potatoes were beyond my expectations",
			star: 4,
		},
		{
			id: 2,
			ownerPics: "",
			ownerName: "Muhammad Baba",
			title: "Perfect for My Fries",
			content:
				"These potatoes are great for making homemade fries , they have a nice starchy texture that crips up beautifully",
			star: 5,
		},
	];

	const chatService = new ChatService();
	const userService = new UserService();

	console.log("Services working");

	useEffect(() => {
		const fetchOwnerDetails = async () => {
			try {
				const userId = route.params.owner; // Get the owner ID from route.params
				if (userId) {
					const owner = await userService.get(userId);
					if (owner) {
						setOwnerId(owner.id);
						setOwnerName(owner.name || ""); // Set the owner name
						setOwnerImageUrl(owner.imageUrl || ""); // Set the owner image URL
					}
				}
			} catch (error) {
				console.error("Failed to fetch owner details", error);
			}
		};

		fetchOwnerDetails();
	}, [route.params.owner]);

	const handleMessageSeller = async () => {
		if (!ownerId) {
			console.error("Owner ID is not available");
			return;
		}

		const chat = await chatService.getOrCreateChat(user.id, ownerId);
		navigation.navigate("ChatScreen", {
			chatId: chat.id,
			receiverName: ownerName, // Pass the owner name
			receiverImageUrl: ownerImageUrl, // Pass the owner image URL
		});
	};

	return (
		<Screen>
			<View>
				<ImageBackground
					source={{ uri: route.params.image }}
					resizeMode="cover"
					style={{
						width: "100%",
						height: 180,
						paddingHorizontal: 16,
						paddingVertical: 16,
					}}
				>
					<View style={styles.buttonContainer}>
						<TouchableOpacity
							style={styles.profileButton}
							onPress={() => navigation.goBack()}
						>
							<FontAwesome6
								name="arrow-left-long"
								size={24}
								color={neutral.white}
							/>
						</TouchableOpacity>
						<TouchableOpacity style={styles.profileButton}>
							<FontAwesome
								name={route.params.isSaved ? "bookmark" : "bookmark-o"}
								size={24}
								color={neutral.white}
							/>
						</TouchableOpacity>
					</View>
				</ImageBackground>
				<View style={styles.titleBoxContainer}>
					<View style={styles.titleBox}>
						<View style={styles.titleDetails}>
							<Text style={{ color: neutral.n950, ...header.h4 }}>
								{route.params.name}
							</Text>
							<Text
								style={{ color: neutral.n600, ...body.p1r }}
							>{`Farm: ${route.params.farmName}`}</Text>
							<View style={styles.stockContainer}>
								<Text style={styles.stock}>In Stock</Text>
								<Text>4.9</Text>
							</View>
						</View>
						<View style={{ alignItems: "flex-end" }}>
							<Text
								style={{
									color: neutral.n950,
									...header.h30,
									textAlign: "left",
								}}
							>
								<FontAwesome6
									name="naira-sign"
									size={24}
									color={neutral.n950}
								/>
								{route.params.price}
							</Text>
							<Text
								style={{ color: neutral.n600, ...label.l4r, textAlign: "left" }}
							>
								{route.params.unit}
							</Text>
						</View>
					</View>
					<View style={styles.contentTop} />
				</View>
			</View>
			<ScrollView>
				<View style={styles.contentBox}>
					<View style={styles.headerBox}>
						<Text style={styles.header}>Description</Text>
						<Text style={{ color: neutral.n600, ...body.p1r }}>
							{description}
						</Text>
					</View>
					<View style={styles.headerBox}>
						<Text style={styles.header}>{`Reviews (${reviewCount})`}</Text>
						<View style={styles.reviewsContainer}>
							{reviews.slice(0, show).map((review, index) => (
								<View key={index} style={styles.reviewBox}>
									<Text style={{ color: neutral.n800, ...body.p1b }}>
										{review.title}
									</Text>
									<Text style={{ color: neutral.n400, ...body.p3b }}>
										{review.time}
									</Text>
									<Text style={{ color: neutral.n800, ...body.p2r }}>
										{review.content}
									</Text>
									<View style={styles.nameTitle}>
										<Image />
										<Text style={{ color: neutral.n600, ...label.l3b }}>
											{review.ownerName}
										</Text>
									</View>
									<View style={styles.contentTop} />
								</View>
							))}
						</View>
					</View>
					<FlatList style={styles.otherProduce} horizontal />
				</View>
			</ScrollView>
			<View style={{ marginHorizontal: 16 }}>
				<EnterButton text="Message Seller" onPress={handleMessageSeller} />
			</View>
		</Screen>
	);
}

const styles = StyleSheet.create({
	profileButton: {
		backgroundColor: "rgba(26, 28, 18, 0.6)",
		width: 40,
		height: 40,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 20,
	},

	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},

	titleBoxContainer: {
		width: "100%",
		padding: 16,
		paddingBottom: 0,
	},

	titleBox: {
		flexDirection: "row",
		justifyContent: "space-between",
	},

	titleDetails: {
		gap: 8,
	},

	stock: {
		paddingHorizontal: 6,
		paddingVertical: 2,
		borderRadius: 100,
		backgroundColor: primary.p100,
		textAlign: "center",
		color: primary.p900,
		...label.l4b,
	},

	stockContainer: {
		flexDirection: "row",
		gap: 8,
	},

	screen: {
		paddingHorizontal: 16,
	},

	contentTop: {
		marginTop: 31,
		borderBottomColor: neutral.n300,
		borderBottomWidth: 1,
	},

	contentBox: {
		paddingHorizontal: 16,
		paddingTop: 25,
		gap: 32,
	},

	header: {
		color: neutral.n900,
		...header.h4,
	},

	headerBox: { gap: 12 },
	reviewBox: { gap: 8 },
	nameTitle: {
		gap: 8,
		flexDirection: "row",
	},

	reviewsContainer: {
		gap: 24,
	},
});
export default ProductDetailsScreen;
