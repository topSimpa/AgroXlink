import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	addDoc,
	updateDoc,
	collection,
	getDocs,
	where,
	query,
	onSnapshot,
	Timestamp,
} from "firebase/firestore";
import { Chat } from "../models/chat";
import { Message } from "../models/message";
import { db } from "../firebaseSetup";

export class ChatService {
	private collectionRef = collection(db, "chats");

	// Fetch a chat by ID
	async getChat(id: string): Promise<Chat | null> {
		const docRef = doc(this.collectionRef, id);
		const docSnap = await getDoc(docRef);
		return docSnap.exists()
			? ({ id: docSnap.id, ...docSnap.data() } as Chat)
			: null;
	}

	// Create a new chat
	async createChat(chat: Omit<Chat, "id">): Promise<string> {
		const docRef = await addDoc(this.collectionRef, chat);
		return docRef.id;
	}

	// Fetch all chats involving the specified user
	async getAllChats(userId: string): Promise<Chat[]> {
		const q = query(
			this.collectionRef,
			where("userIds", "array-contains", userId)
		);
		const querySnapshot = await getDocs(q);
		return querySnapshot.docs.map(
			(doc) => ({ id: doc.id, ...doc.data() } as Chat)
		);
	}

	// Real-time chat updates for the specified user
	onChatSnapshot(userId: string, callback: (chats: Chat[]) => void) {
		const q = query(
			this.collectionRef,
			where("userIds", "array-contains", userId)
		);

		// Return the unsubscribe function
		return onSnapshot(q, (snapshot) => {
			const chats = snapshot.docs.map(
				(doc) => ({ id: doc.id, ...doc.data() } as Chat)
			);
			callback(chats);
		});
	}

	// Update the last message in a chat
	async updateLastMessage(chatId: string, lastMessage: Message): Promise<void> {
		const docRef = doc(this.collectionRef, chatId);
		await updateDoc(docRef, { lastMessage });
	}

	async getOrCreateChat(userId1: string, userId2: string): Promise<Chat> {
		const chats = await this.getAllChats(userId1);
		let chat = chats.find((chat) => chat.userIds.includes(userId2));

		if (chat) {
			return chat;
		}

		const newChat: Omit<Chat, "id"> = {
			userIds: [userId1, userId2],
			dateCreated: Timestamp.now(),
			dateUpdated: Timestamp.now(),
		};

		const newChatId = await this.createChat(newChat);
		return { id: newChatId, ...newChat } as Chat;
	}
}
