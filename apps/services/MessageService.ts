import {
	collection,
	doc,
	getDoc,
	addDoc,
	Timestamp,
	getDocs,
	query,
	where,
	deleteDoc,
} from "firebase/firestore";
import { db } from "../firebaseSetup";
import { Message } from "../models/message";

class MessageService {
	private collectionRef;

	constructor() {
		this.collectionRef = collection(db, "messages");
	}

	async sendMessage(message: Message): Promise<string> {
		const messageData = {
			...message,
			timestamp: Timestamp.fromDate(new Date()),
		};

		const docRef = await addDoc(this.collectionRef, messageData);
		return docRef.id;
	}

	async getMessagesByChatId(chatId: string): Promise<Message[]> {
		const q = query(this.collectionRef, where("chatId", "==", chatId));
		const querySnapshot = await getDocs(q);
		const messages: Message[] = [];

		querySnapshot.forEach((doc) => {
			messages.push({ id: doc.id, ...doc.data() } as Message);
		});

		return messages;
	}

	async get(id: string): Promise<Message | null> {
		const docRef = doc(this.collectionRef, id);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			return { id: docSnap.id, ...docSnap.data() } as Message;
		} else {
			return null;
		}
	}

	async delete(id: string): Promise<void> {
		const docRef = doc(this.collectionRef, id);
		await deleteDoc(docRef);
	}
}

export default MessageService;
