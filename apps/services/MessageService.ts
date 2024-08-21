// services/MessageService.ts
import {
	collection,
	addDoc,
	query,
	orderBy,
	onSnapshot,
	FirestoreError,
	QuerySnapshot,
	DocumentData,
	getDocs,
	updateDoc,
	serverTimestamp,
	setDoc,
	doc,
} from "firebase/firestore";
import { db } from "../firebaseSetup";

class MessageService {
	// Send a new message to a specific chat
	async sendMessage(chatId: string, message: any) {
		const chatRef = doc(db, "chats", chatId);
		const messageRef = doc(collection(chatRef, "messages"));

		await setDoc(messageRef, {
			...message,
			createdAt: serverTimestamp(),
		});

		// Update lastMessage in the chat document
		await updateDoc(chatRef, {
			lastMessage: {
				text: message.text,
				createdAt: serverTimestamp(),
			},
		});
	}

	// Fetch messages (snapshot without real-time updates)
	async fetchMessages(chatId: string): Promise<DocumentData[]> {
		const messagesRef = collection(db, "chats", chatId, "messages");
		const q = query(messagesRef, orderBy("createdAt", "asc"));
		const snapshot = await getDocs(q);
		return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
	}

	// Subscribe to real-time updates of messages
	onMessageSnapshot(
		chatId: string,
		callback: (messages: any[]) => void,
		errorCallback?: (error: FirestoreError) => void
	) {
		const messagesRef = collection(db, "chats", chatId, "messages");
		const q = query(messagesRef, orderBy("createdAt", "asc"));

		// Ensure onSnapshot is used correctly
		const unsubscribe = onSnapshot(
			q,
			(snapshot: QuerySnapshot<DocumentData>) => {
				const messages = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				callback(messages);
			},
			(error: FirestoreError) => {
				if (errorCallback) {
					errorCallback(error);
				} else {
					console.error("Error fetching messages: ", error);
				}
			}
		);

		return unsubscribe; // Ensure this line is correctly returning the unsubscribe function
	}
}

export default new MessageService();
