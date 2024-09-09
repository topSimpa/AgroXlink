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
import { Comment } from "../models/comment";

class CommentService {
	private collectionRef = collection(db, "comments");

	// Create a new comment
	async create(
		comment: Omit<Comment, "id" | "dateCreated" | "dateUpdated">
	): Promise<string> {
		const docRef = await addDoc(this.collectionRef, {
			...comment,
			dateCreated: Timestamp.fromDate(new Date()),
			dateUpdated: Timestamp.fromDate(new Date()),
		});
		return docRef.id;
	}

	// Get a comment by ID
	async get(id: string): Promise<Comment | null> {
		const docRef = doc(this.collectionRef, id);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			const data = docSnap.data() as Omit<Comment, "id">;
			return { id: docSnap.id, ...data };
		} else {
			return null;
		}
	}

	// Real-time updates for comments on a specific post
	onCommentsSnapshot(postId: string, callback: (comments: Comment[]) => void) {
		const q = query(this.collectionRef, where("postId", "==", postId));

		return onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
			const comments = snapshot.docs.map((doc) => {
				const data = doc.data() as Omit<Comment, "id">;
				return { id: doc.id, ...data };
			});
			callback(comments);
		});
	}

	// Update a comment
	async update(id: string, comment: Partial<Comment>): Promise<void> {
		const docRef = doc(this.collectionRef, id);
		await updateDoc(docRef, {
			...comment,
			dateUpdated: Timestamp.fromDate(new Date()),
		});
	}

	// Delete a comment
	async delete(id: string): Promise<void> {
		const docRef = doc(this.collectionRef, id);
		await deleteDoc(docRef);
	}
}

export default new CommentService();
