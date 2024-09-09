import {
	collection,
	doc,
	getDoc,
	setDoc,
	addDoc,
	deleteDoc,
	updateDoc,
	onSnapshot,
	QuerySnapshot,
	DocumentData,
	Timestamp,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebaseSetup";
import { Review } from "../models/review";

class ReviewService {
	private collectionRef = collection(db, "reviews");

	// Create a new review
	async create(
		review: Omit<Review, "id" | "dateCreated" | "dateUpdated">
	): Promise<string> {
		const docRef = await addDoc(this.collectionRef, {
			...review,
			dateCreated: Timestamp.fromDate(new Date()),
			dateUpdated: Timestamp.fromDate(new Date()),
		});
		return docRef.id;
	}

	// Get a review by ID
	async get(id: string): Promise<Review | null> {
		const docRef = doc(this.collectionRef, id);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			const data = docSnap.data() as Omit<Review, "id">;
			return { id: docSnap.id, ...data };
		} else {
			return null;
		}
	}

	// Real-time updates for reviews on a specific product
	onReviewsSnapshot(productId: string, callback: (reviews: Review[]) => void) {
		const q = query(this.collectionRef, where("productId", "==", productId));

		return onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
			const reviews = snapshot.docs.map((doc) => {  
				const data = doc.data() as Omit<Review, "id">;
				return { id: doc.id, ...data };
			});
			callback(reviews);
		});
	}

	// Update a review
	async update(id: string, review: Partial<Review>): Promise<void> {
		const docRef = doc(this.collectionRef, id);
		await updateDoc(docRef, {
			...review,
			dateUpdated: Timestamp.fromDate(new Date()),
		});
	}

	// Delete a review
	async delete(id: string): Promise<void> {
		const docRef = doc(this.collectionRef, id);
		await deleteDoc(docRef);
	}
}

export default new ReviewService();
