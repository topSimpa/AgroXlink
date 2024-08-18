// services/ChatService.ts

import {
	collection,
	doc,
	getDoc,
	addDoc,
	updateDoc,
	deleteDoc,
	Timestamp,
	getDocs,
	query,
	where,
} from "firebase/firestore";
import { db } from "../firebaseSetup";
import { Chat } from "../models/chat";
import MessageService from "./MessageService";
import { Message } from "../models/message";
import { UserService } from "./UserService";

class ChatService {
	private collectionRef;
	private messageService: MessageService;
	private userService: UserService;

	constructor() {
		this.collectionRef = collection(db, "chats");
		this.messageService = new MessageService();
		this.userService = new UserService();
	}

	async create(chat: Chat): Promise<string> {
		const chatData = {
			...chat,
			dateCreated: Timestamp.fromDate(new Date()),
			dateUpdated: Timestamp.fromDate(new Date()),
		};

		const docRef = await addDoc(this.collectionRef, chatData);
		return docRef.id;
	}

	async get(id: string): Promise<Chat | null> {
		const docRef = doc(this.collectionRef, id);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			return { id: docSnap.id, ...docSnap.data() } as Chat;
		} else {
			return null;
		}
	}

	async update(id: string, chat: Partial<Chat>): Promise<void> {
		const docRef = doc(this.collectionRef, id);
		const chatData = {
			...chat,
			dateUpdated: Timestamp.fromDate(new Date()),
		};
		await updateDoc(docRef, chatData);
	}

	async delete(id: string): Promise<void> {
		const docRef = doc(this.collectionRef, id);
		const docSnap = await getDoc(docRef);
		if (!docSnap.exists()) {
			throw new Error("Chat does not exist");
		}
		await deleteDoc(docRef);
	}

	async sendMessage(message: Message): Promise<string> {
		return await this.messageService.sendMessage(message);
	}

	async getMessages(chatId: string): Promise<Message[]> {
		return await this.messageService.getMessagesByChatId(chatId);
	}

	async searchChatsByUserName(userName: string): Promise<Chat[]> {
		const users = await this.userService.getUsersByName(userName);

		if (users.length === 0) {
			throw new Error("User not found");
		}

		const chats: Chat[] = [];

		for (const user of users) {
			const q = query(
				this.collectionRef,
				where("userIds", "array-contains", user.id)
			);
			const querySnapshot = await getDocs(q);

			querySnapshot.forEach((doc) => {
				chats.push({ id: doc.id, ...doc.data() } as Chat);
			});
		}

		return chats;
	}

	async getAllChats(): Promise<Chat[]> {
		const querySnapshot = await getDocs(this.collectionRef);
		const chats: Chat[] = [];

		querySnapshot.forEach((doc) => {
			chats.push({ id: doc.id, ...doc.data() } as Chat);
		});

		return chats;
	}
}

export default ChatService;
