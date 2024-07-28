import { Timestamp } from "firebase/firestore";

export interface Post {
	id?: string;
	userId: string;
	text: string;
	attachmentUrl?: string;
	likes: number;
	comments: string[];
	dateCreated: Timestamp;
	dateUpdated: Timestamp;
	likedBy: string[];
	savedBy: string[];
}
