import { Timestamp } from "firebase/firestore";

export interface Product {
	id?: string;
	crop: string;
	price: number;
	farmName: string;
	quantity: number;
	cropType: string;
	imageUrl?: string;
	userId: string | void;
	dateCreated?: Timestamp;
	dateUpdated?: Timestamp;
}
