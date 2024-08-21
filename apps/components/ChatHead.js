import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import NameTime from "./NameTime";
import neutral from "../config/colors/neutralColor";
import body from "../config/body";
import ChatService from "../services/ChatService";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../auth/useAuth"; // Import useAuth to get user


function ChatHead({ owner, lastMessage, picture }) {
	// Add 'picture' prop
	const { user } = useAuth(); // Get current user
	const [isClicked, setClicked] = useState(false);
	const navigation = useNavigation();

	// const handleClick = async () => {
	// 	const chat = await chatService.getOrCreateChat(user.id, owner.id);
	// 	console.log(chat.id);
	// 	setClicked(true);
	// 	navigation.navigate("ChatScreen", {
	// 		chatId: chat.id,
	// 		productOwner: owner,
	// 	});
	// };

	return (
    <></>
		// <TouchableOpacity>
		// 	{" "}
		// 	{/* Corrected the onPress handler */}
		// 	<View style={styles.messageHeader}>
		// 		<View style={styles.imageContainer}>
		// 			<Image resizeMode="contain" style={styles.profile} source={picture} />
		// 		</View>
		// 		<View style={styles.latest}>
		// 			<NameTime
		// 				owner={owner.name}
		// 				time={new Date(owner.lastSeen).toLocaleTimeString()}
		// 			/>{" "}
		// 			{/* Assuming you want to display the last seen time */}
		// 			<Text
		// 				style={{
		// 					color: isClicked ? neutral.n400 : neutral.n950,
		// 					marginTop: 4,
		// 					...body.p3b,
		// 					paddingRight: 16,
		// 				}}
		// 				numberOfLines={2}
		// 			>
		// 				{lastMessage}
		// 			</Text>
		// 		</View>
		// 	</View>
		// </TouchableOpacity>
	);
}

const styles = StyleSheet.create({
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
		borderBottomColor: neutral.n100,
		flexDirection: "row",
		height: 92,
	},

	profile: {
		height: "100%",
		width: "100%",
	},
});

export default ChatHead;
