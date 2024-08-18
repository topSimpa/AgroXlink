import { collection, doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { User } from "../models/user";
import { db } from "../firebaseSetup";
import { uploadImage } from "../utils/uploadImage";

class UserService {
	private collectionRef;

	constructor() {
		this.collectionRef = collection(db, "users");
	}

	async create(user: User, imageFile?: File): Promise<void> {
		const docRef = doc(this.collectionRef, user.id);

		// If an image file is provided, upload it and get the download URL
		let imageUrl: string | null = null;
		if (imageFile) {
			imageUrl = await uploadImage(
				imageFile,
				`users/${user.id}/profilePicture`,
				user.id || ""
			);
		}

		await setDoc(docRef, {
			...user,
			imageUrl, // Save the image URL if it was uploaded
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

	async getOrCreate(
		id: string,
		userInfo: Partial<User>,
		imageFile?: File
	): Promise<User> {
		const docRef = doc(this.collectionRef, id);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			return { id: docSnap.id, ...(docSnap.data() as User) };
		} else {
			const newUser: User = {
				id,
				email: userInfo.email || "",
				imageUrl: null || "", // Initialize with null imageUrl
				dateCreated: Timestamp.fromDate(new Date()),
				dateUpdated: Timestamp.fromDate(new Date()),
				onboardingCompleted: false,
				...userInfo,
			};

			await this.create(newUser, imageFile);
			return newUser;
		}
	}

	async update(
		id: string,
		user: Partial<User>,
		imageFile?: File
	): Promise<void> {
		const docRef = doc(this.collectionRef, id);

		// If an image file is provided, upload it and get the download URL
		let imageUrl: string | null = null;
		if (imageFile) {
			imageUrl = await uploadImage(imageFile, `users/${id}/profilePicture`, id);
		}

		await setDoc(
			docRef,
			{
				...user,
				imageUrl: imageUrl ? imageUrl : user.imageUrl, // Update the image URL if a new one is uploaded
				dateUpdated: Timestamp.fromDate(new Date()),
			},
			{ merge: true } // Merge to only update the fields provided
		);
	}
}

export { UserService };
