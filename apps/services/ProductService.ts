import {
	collection,
	addDoc,
	getDocs,
	doc,
	updateDoc,
	deleteDoc,
	Timestamp,
	getDoc,
	query,
	where,
} from "firebase/firestore";

import { UserService } from "./UserService";
import { db } from "../firebaseSetup";
import { Product } from "../models/product";
import { User } from "../models/user";

class ProductService {
	private collectionRef;
	private userService;

	constructor() {
		this.collectionRef = collection(db, "products");
		this.userService = new UserService();
	}

	async create(
		product: Omit<Product, "id" | "dateCreated" | "dateUpdated" | "imageUrl">
	): Promise<string> {
		const { userId, crop, ...productData } = product;

		// Ensure userId is a string before proceeding
		if (!userId || typeof userId !== "string") {
			throw new Error("Invalid userId");
		}

		// Get the user and check if they have the crop
		const user = await this.userService.get(userId);
		// if (!user || !user.crops?.includes(crop)) {
		// 	throw new Error("User does not have this crop in their profile");
		// }

		// Create the product document with an empty imageUrl field
		const docRef = await addDoc(this.collectionRef, {
			...productData,
			crop,
			userId,
			imageUrl: "", // Placeholder for the image URL
			dateCreated: Timestamp.fromDate(new Date()),
			dateUpdated: Timestamp.fromDate(new Date()),
		});

		return docRef.id; // Return the product ID
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

	// New function to get products by user ID
	async getByUserId(userId: string): Promise<Product[]> {
		// Query the products collection where userId matches the given userId
		const q = query(this.collectionRef, where("userId", "==", userId));
		const querySnapshot = await getDocs(q);
		const products: Product[] = [];

		querySnapshot.forEach((doc) => {
			products.push({ id: doc.id, ...doc.data() } as Product);
		});

		return products;
	}

	async getByMultipleCropTypes(cropTypes: string[]): Promise<Product[]> {
		try {
			const products: Product[] = [];

			// Fetch products by each crop type and aggregate results
			for (const cropType of cropTypes) {
				const q = query(this.collectionRef, where("cropType", "==", cropType));
				const querySnapshot = await getDocs(q);
				querySnapshot.forEach((doc) => {
					products.push({ id: doc.id, ...doc.data() } as Product);
				});
			}

			return products;
		} catch (error) {
			console.error("Error fetching products by multiple crop types:", error);
			throw error;
		}
	}

	// Method to get all products
	async getAllProducts(): Promise<Product[]> {
		const querySnapshot = await getDocs(this.collectionRef);
		const products: Product[] = [];

		querySnapshot.forEach((doc) => {
			products.push({ id: doc.id, ...doc.data() } as Product);
		});

		return products;
	}

	async getByCropType(cropType: string): Promise<Product[]> {
		// Convert cropType to lowercase for case-insensitive matching
		const lowerCaseCropType = cropType.toLowerCase();

		// Query the products collection where cropType matches the given lowercased cropType
		const q = query(
			this.collectionRef,
			where("cropType", "==", lowerCaseCropType)
		);
		const querySnapshot = await getDocs(q);
		const products: Product[] = [];

		querySnapshot.forEach((doc) => {
			products.push({ id: doc.id, ...doc.data() } as Product);
		});

		return products;
	}

	async getProductWithOwner(
		productId: string
	): Promise<{ product: Product | null; owner: User | null }> {
		const product = await this.getById(productId);
		let owner = null;
		if (product && product.userId) {
			owner = await this.userService.get(product.userId);
		}
		return { product, owner };
	}
}

export default ProductService;
