import { collection, deleteDoc, doc, getDoc, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { User } from "../models/user";
import { db } from "../firebaseSetup";
import { uploadImage } from "../utils/uploadImage";

class UserService {
	private collectionRef;

	constructor() {
		this.collectionRef = collection(db, "users");
	}

	async create(user: User): Promise<string> {
		if (!user.email) {
			throw new Error("Missing required field: email");
		}
		const docRef = doc(this.collectionRef, user.id);
		await setDoc(docRef, {
			...user,
			dateCreated: Timestamp.fromDate(new Date()),
			dateUpdated: Timestamp.fromDate(new Date()),
		});
		return docRef.id;
	}

	async get(id: string): Promise<User | null> {
		if (!id) {
			throw new Error("userId is missing");
		}
		const docRef = doc(this.collectionRef, id);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			return { id: docSnap.id, ...(docSnap.data() as User) };
		} else {
			return null;
		}
	}

	async getOrCreate(id: string, userInfo: Partial<User>): Promise<User> {
		let user = await this.get(id);
		if (user) {
			return user;
		} else {
			const newUser: User = {
				id,
				email: userInfo.email ?? "", // Ensure email is provided
				name: userInfo.name,
				phoneNumber: userInfo.phoneNumber,
				address: userInfo.address,
				dateCreated: Timestamp.fromDate(new Date()),
				dateUpdated: Timestamp.fromDate(new Date()),
				imageUrl: userInfo.imageUrl,
				onboardingCompleted: userInfo.onboardingCompleted ?? false,
			};
			await this.create(newUser);
			return newUser;
		}
	}

	async update(id: string, user: Partial<User>): Promise<void> {
		const docRef = doc(this.collectionRef, id);
		const docSnap = await getDoc(docRef);

		if (!docSnap.exists()) {
			throw new Error("Invalid user ID");
		}

		let pictureUrl;
		if (user.imageUrl) {
			pictureUrl = await uploadImage(user.imageUrl, "users", id);
		}
		const userData = {
			...user,
			...(pictureUrl && { pictureUrl }),
			dateUpdated: Timestamp.fromDate(new Date()),
		};
		await updateDoc(docRef, userData);
	}

	async delete(id: string): Promise<void> {
		const docRef = doc(this.collectionRef, id);
		const docSnap = await getDoc(docRef);
		if (!docSnap.exists()) {
			throw new Error("User does not exist");
		}
		await deleteDoc(docRef);
	}
}

export { UserService };
