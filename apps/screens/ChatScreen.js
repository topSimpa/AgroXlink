import React, { useState, useEffect, useLayoutEffect } from "react";
import {
	FlatList,
	TextInput,
	Button,
	View,
	Text,
	Image,
	StyleSheet,
} from "react-native";
import MessageService from "../services/MessageService";
import { useRoute } from "@react-navigation/native";
import useAuth from "../auth/useAuth";

const ChatScreen = ({ navigation }) => {
	const { user } = useAuth();
	const route = useRoute();
	const { chatId, receiverName, receiverImageUrl } = route.params;

	const [messages, setMessages] = useState([]);
	const [text, setText] = useState("");

	useEffect(() => {
		const unsubscribe = MessageService.onMessageSnapshot(chatId, setMessages);
		return () => unsubscribe();
	}, [chatId]);

	const handleSend = async () => {
		if (text.trim()) {
			await MessageService.sendMessage(chatId, {
				text,
				senderId: user.id,
				receiverId: "", // Set receiver's ID
				status: "sent",
			});
			setText("");
		}
	};

	const renderMessage = ({ item }) => (
		<View
			style={
				item.senderId === user.id ? styles.sentMessage : styles.receivedMessage
			}
		>
			<Text>{item.text}</Text>
		</View>
	);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: () => (
				<View style={styles.headerTitle}>
					<Image
						source={{
							uri:
								receiverImageUrl ||
								"https://www.justwatch.com/images/icon/285104543/s166/chelsea-fc.png",
						}}
						style={styles.receiverImage}
					/>
					<Text style={styles.receiverName}>{receiverName || "Unknown"}</Text>
				</View>
			),
		});
	}, [navigation, receiverName, receiverImageUrl]);

	return (
		<View style={styles.container}>
			<FlatList
				data={messages}
				renderItem={renderMessage}
				keyExtractor={(item) => item.id}
				contentContainerStyle={styles.messageList}
			/>
			<View style={styles.inputContainer}>
				<TextInput
					value={text}
					onChangeText={setText}
					placeholder="Type a message..."
					style={styles.input}
				/>
				<Button title="Send" onPress={handleSend} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "space-between",
	},
	messageList: {
		padding: 16,
	},
	sentMessage: {
		alignSelf: "flex-end",
		backgroundColor: "#DCF8C6",
		padding: 10,
		borderRadius: 5,
		marginVertical: 5,
	},
	receivedMessage: {
		alignSelf: "flex-start",
		backgroundColor: "#FFF",
		padding: 10,
		borderRadius: 5,
		marginVertical: 5,
	},
	inputContainer: {
		flexDirection: "row",
		padding: 8,
		borderTopWidth: 1,
		borderColor: "#ddd",
	},
	input: {
		flex: 1,
		borderWidth: 1,
		borderColor: "#ddd",
		borderRadius: 5,
		padding: 10,
		marginRight: 8,
	},
	headerTitle: {
		flexDirection: "row",
		alignItems: "center",
	},
	receiverImage: {
		width: 40,
		height: 40,
		borderRadius: 20,
		marginRight: 10,
	},
	receiverName: {
		fontSize: 18,
		fontWeight: "bold",
	},
});

export default ChatScreen;
