import {
	collection,
	doc,
	getDoc,
	addDoc,
	Timestamp,
	getDocs,
	query,
	where,
	updateDoc,
	setDoc,
} from "firebase/firestore";
import { db } from "../firebaseSetup";
import { Chat } from "../models/chat";
import { generateChatId } from "../utils/generateChat";

class ChatService {
	private collectionRef;

	constructor() {
		this.collectionRef = collection(db, "chats");
	}

	async createChat(chat: Chat): Promise<string> {
		const chatData = {
			...chat,
			dateCreated: Timestamp.fromDate(new Date()),
		};

		const docRef = await addDoc(this.collectionRef, chatData);
		return docRef.id;
	}

	async getChatDetails(chatId: string): Promise<Chat | null> {
		const docRef = doc(this.collectionRef, chatId);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			return { id: docSnap.id, ...docSnap.data() } as Chat;
		} else {
			return null;
		}
	}

	async updateChat(chatId: string, updates: Partial<Chat>): Promise<void> {
		const docRef = doc(this.collectionRef, chatId);
		await updateDoc(docRef, updates);
	}

	async getOrCreateChat(userId1: string, userId2: string): Promise<Chat> {
		const chatId = generateChatId(userId1, userId2);

		const chatRef = doc(db, "chats", chatId);
		const chatDoc = await getDoc(chatRef);

		if (chatDoc.exists()) {
			return chatDoc.data() as Chat; // Existing chat
		} else {
			const newChat: Chat = {
				id: chatId,
				userIds: [userId1, userId2],
				lastMessage: "",
				dateCreated: Timestamp.now(),
				dateUpdated: Timestamp.now(),
			};

			await setDoc(chatRef, newChat);
			return newChat; // New chat
		}
	}
}

export default ChatService;
