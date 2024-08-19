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
} from "firebase/firestore";
import { db } from "../firebaseSetup";
import { Chat } from "../models/chat";

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
}

export default ChatService;
