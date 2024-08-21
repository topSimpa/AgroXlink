import { Timestamp } from "firebase/firestore";
import { Message } from "./message";

export interface Chat {
	id?: string;
	imageUrl?: string;
	userIds: string[];
	lastMessage?: Message; // Optional, for preview purposes
	dateCreated?: Timestamp;
	dateUpdated?: Timestamp;
}
