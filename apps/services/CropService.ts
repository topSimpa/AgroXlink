import {
	collection,
	doc,
	getDoc,
	setDoc,
	deleteDoc,
	Timestamp,
	query,
	where,
	getDocs,
} from "firebase/firestore";
import { db } from "../firebaseSetup";
import { Crop } from "../models/crop";

class CropService {
	private collectionRef;

	constructor() {
		this.collectionRef = collection(db, "crops");
	}

	async create(crop: Crop): Promise<void> {
		const docRef = doc(this.collectionRef, crop.id || new Date().toISOString());
		await setDoc(docRef, {
			...crop,
			dateCreated: Timestamp.fromDate(new Date()),
			dateUpdated: Timestamp.fromDate(new Date()),
		});
	}

	async get(id: string): Promise<Crop | null> {
		if (!id) {
			throw new Error("Crop ID is missing");
		}
		const docRef = doc(this.collectionRef, id);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			return { id: docSnap.id, ...(docSnap.data() as Crop) };
		} else {
			return null;
		}
	}

	async getByUserId(userId: string): Promise<Crop[]> {
		const cropsQuery = query(this.collectionRef, where("userId", "==", userId));
		const querySnapshot = await getDocs(cropsQuery);
		return querySnapshot.docs.map((doc) => ({
			id: doc.id,
			...(doc.data() as Crop),
		}));
	}

	async delete(id: string): Promise<void> {
		if (!id) {
			throw new Error("Crop ID is missing");
		}
		const docRef = doc(this.collectionRef, id);
		return await deleteDoc(docRef);
	}
}

export { CropService };
