import {
	collection,
	addDoc,
	getDocs,
	doc,
	updateDoc,
	deleteDoc,
	Timestamp,
	getDoc,
} from "firebase/firestore";

import { UserService } from "./UserService";
import { db } from "../firebaseSetup";
import { Product } from "../models/product";

class ProductService {
	private collectionRef;
	private userService;

	constructor() {
		this.collectionRef = collection(db, "products");
		this.userService = new UserService();
	}

	async create(
		product: Omit<Product, "id" | "dateCreated" | "dateUpdated">
	): Promise<string> {
		const { userId, crop, ...productData } = product;

		// Ensure userId is a string before proceeding
		if (!userId || typeof userId !== "string") {
			throw new Error("Invalid userId");
		}

		// Get the user and check if they have the crop
		const user = await this.userService.get(userId);
		if (!user || !user.crops?.includes(crop)) {
			throw new Error("User does not have this crop in their profile");
		}

		const docRef = await addDoc(this.collectionRef, {
			...productData,
			crop,
			userId,
			dateCreated: Timestamp.fromDate(new Date()),
			dateUpdated: Timestamp.fromDate(new Date()),
		});

		return docRef.id;
	}

	async getAll(): Promise<Product[]> {
		const querySnapshot = await getDocs(this.collectionRef);
		const products: Product[] = [];
		querySnapshot.forEach((doc) => {
			products.push({ id: doc.id, ...doc.data() } as Product);
		});
		return products;
	}

	async getById(productId: string): Promise<Product | null> {
		const docRef = doc(this.collectionRef, productId);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			return { id: docSnap.id, ...docSnap.data() } as Product;
		} else {
			return null;
		}
	}

	async update(productId: string, product: Partial<Product>): Promise<void> {
		const docRef = doc(this.collectionRef, productId);
		await updateDoc(docRef, {
			...product,
			dateUpdated: Timestamp.fromDate(new Date()),
		});
	}

	async delete(productId: string): Promise<void> {
		const docRef = doc(this.collectionRef, productId);
		await deleteDoc(docRef);
	}
}

export default ProductService;
