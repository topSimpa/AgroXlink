	import { Timestamp } from "firebase/firestore";

	export interface Chat {
		id?: string;
		name: string;
		imageUrl?: string;
		userIds: string[];
		lastMessage: string;
		dateCreated: Timestamp;
		dateUpdated: Timestamp;
	}
