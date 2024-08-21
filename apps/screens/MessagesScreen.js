import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	View,
	FlatList,
	TouchableOpacity,
	Text,
	Image,
} from "react-native";

import Screen from "../components/Screen";
import MenuHeader from "../components/MenuHeader";
import neutral from "../config/colors/neutralColor";
import SearchBar from "../components/SearchBar";

import useAuth from "../auth/useAuth";
import { UserService } from "../services/UserService";
import { ChatService } from "../services/ChatService";

import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseSetup";

const userService = new UserService();
const chatService = new ChatService();

function MessagesScreen({ navigation }) {
	const { user } = useAuth();
	const [chats, setChats] = useState([]);
	const [users, setUsers] = useState({});

	useEffect(() => {
		const chatsRef = collection(db, "chats");
		console.log("chatsRef ->", chatsRef);
		// const q = query(chatsRef, orderBy("lastMessage.createdAt", "desc"));
		const q = query(chatsRef);

		const unsubscribe = onSnapshot(
			q,
			(snapshot) => {
				console.log("Snapshot docs:", snapshot.docs); // Log the snapshot docs
				const chatList = snapshot.docs
					.map((doc) => ({
						id: doc.id,
						...doc.data(),
					}))
					.filter((chat) => chat.userIds.includes(user.id)); // Only include chats where the current user is a participant

				console.log("Filtered chatList:", chatList); // Log the filtered chat list
				setChats(chatList);
			},
			(error) => console.error("Error fetching chats: ", error)
		);

		return () => unsubscribe();
	}, [user.id]);

	useEffect(() => {
		if (!user) return; // Chec
		const fetchUsers = async () => {
			const userIds = Array.from(
				new Set(
					chats.flatMap((chat) => chat.userIds.filter((id) => id !== user.id))
				)
			);
			const usersMap = {};

			for (let userId of userIds) {
				const fetchedUser = await userService.get(userId);
				if (fetchedUser) {
					usersMap[userId] = fetchedUser;
				}
			}

			setUsers(usersMap);
		};

		fetchUsers();
	}, [chats]);

	const renderChat = ({ item }) => {
		const otherUserId = item.userIds.find((id) => id !== user.id);
		const otherUser = users[otherUserId] || { name: "", imageUrl: "" };

		const handleClick = async () => {
			if (!otherUserId) return;

			navigation.navigate("ChatScreen", {
				chatId: item.id,
				receiverName: otherUser.name,
				receiverImageUrl: otherUser.imageUrl,
			});
		};

		console.log("Rendering chat item:", item); // Log the item
		console.log("Last message in chat:", item.lastMessage); // Log the last message

		return (
			<TouchableOpacity onPress={handleClick}>
				<View style={styles.messageHeader}>
					<View style={styles.imageContainer}>
						<Image
							resizeMode="contain"
							style={styles.profile}
							source={
								otherUser.imageUrl
									? { uri: otherUser.imageUrl }
									: require("../assets/Avatar.png")
							}
						/>
					</View>
					<View style={styles.latest}>
						<Text style={styles.name}>{otherUser.name}</Text>
						<Text style={styles.lastMessage} numberOfLines={2}>
							{item.lastMessage?.text}
						</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
	};

	return (
		<View style={styles.screen}>
			<Screen>
				<MenuHeader
					image={require("../assets/Avatar.png")}
					color={neutral.n950}
					title={"Messages"}
				/>
				<SearchBar
					field={"chat.Owner"}
					placeholder={"search"}
					onResults={(result) => {}}
				/>
				<FlatList
					data={chats}
					renderItem={renderChat}
					keyExtractor={(item) => item.id}
					contentContainerStyle={styles.chatList}
				/>
			</Screen>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		backgroundColor: neutral.background,
	},
	chatList: {
		padding: 16,
	},
	imageContainer: {
		width: 56,
		height: 56,
	},
	latest: {
		paddingHorizontal: 16,
	},
	messageHeader: {
		paddingHorizontal: 16,
		alignItems: "center",
		borderBottomWidth: 1,
		borderBottomColor: "#ddd",
		flexDirection: "row",
		height: 92,
	},
	profile: {
		height: "100%",
		width: "100%",
	},
	name: {
		fontWeight: "bold",
	},
	lastMessage: {
		color: "#555", // Adjust color as needed
		marginTop: 4,
	},
});

export default MessagesScreen;
