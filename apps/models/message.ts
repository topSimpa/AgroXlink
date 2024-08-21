import { Timestamp } from "firebase/firestore";

export interface Message {
	id?: string;
	chatId: string;
	recieverId: string;
	senderId: string;
	text?: string;
	attachmentUrl?: string;
	createAt?: Timestamp;
}
