import { Timestamp } from "firebase/firestore";

export interface Crop {
	id?: string;
	name: string;
	category: string;
	userId: string;
	dateCreated?: Timestamp;
	dateUpdated?: Timestamp;
}
