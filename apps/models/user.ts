import { GeoPoint, Timestamp } from "firebase/firestore";

export enum UserType {
	Buyer = "buyer",
	Farmer = "farmer",
}

export interface User {
	id?: string;
	name?: string;
	phoneNumber?: string;
	email: string;
	password?: string;
	address?: {
		street: string;
		city: string;
		state: string;
	};
	type?: UserType;
	crops?: string[];
	products?: string[];
	chats?: string[];
	imageUrl?: string;
	dateCreated?: Timestamp;
	dateUpdated?: Timestamp;
	onboardingCompleted?: boolean;
}
