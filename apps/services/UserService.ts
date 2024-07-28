// UserService.ts
import { collection, doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { User } from "../models/user";
import { db } from "../firebaseSetup";

class UserService {
	private collectionRef;

	constructor() {
		this.collectionRef = collection(db, "users");
	}

	async create(user: User): Promise<void> {
		const docRef = doc(this.collectionRef, user.id);
		await setDoc(docRef, {
			...user,
			dateCreated: Timestamp.fromDate(new Date()),
			dateUpdated: Timestamp.fromDate(new Date()),
		});
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
		const docRef = doc(this.collectionRef, id);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			return { id: docSnap.id, ...(docSnap.data() as User) };
		} else {
			const newUser: User = {
				id,
				email: userInfo.email || "",
				dateCreated: Timestamp.fromDate(new Date()),
				dateUpdated: Timestamp.fromDate(new Date()),
				onboardingCompleted: false,
				...userInfo,
			};
			await this.create(newUser);
			return newUser;
		}
	}

	async update(id: string, user: Partial<User>): Promise<void> {
		const docRef = doc(this.collectionRef, id);
		await setDoc(
			docRef,
			{
				...user,
				dateUpdated: Timestamp.fromDate(new Date()),
			},
			{ merge: true }
		);
	}
}

export { UserService };
