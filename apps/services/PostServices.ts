import {
	collection,
	doc,
	getDoc,
	addDoc,
	updateDoc,
	deleteDoc,
	Timestamp,
	getDocs,
	query,
	where,
} from "firebase/firestore";

import { Post } from "../models/post";
import { db } from "../firebaseSetup";

class PostService {
	private collectionRef;

	constructor() {
		this.collectionRef = collection(db, "posts");
	}

	async create(
		post: Omit<Post, "id" | "dateCreated" | "dateUpdated">
	): Promise<string> {
		const docRef = await addDoc(this.collectionRef, {
			...post,
			dateCreated: Timestamp.fromDate(new Date()),
			dateUpdated: Timestamp.fromDate(new Date()),
		});
		return docRef.id;
	}

	async get(id: string): Promise<Post | null> {
		const docRef = doc(this.collectionRef, id);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			return { id: docSnap.id, ...docSnap.data() } as Post;
		} else {
			return null;
		}
	}

	async update(id: string, post: Partial<Post>): Promise<void> {
		const docRef = doc(this.collectionRef, id);
		await updateDoc(docRef, {
			...post,
			dateUpdated: Timestamp.fromDate(new Date()),
		});
	}

	async delete(id: string): Promise<void> {
		const docRef = doc(this.collectionRef, id);
		const docSnap = await getDoc(docRef);
		if (!docSnap.exists()) {
			throw new Error("Post does not exist");
		}
		await deleteDoc(docRef);
	}

	async like(id: string): Promise<void> {
		const docRef = doc(this.collectionRef, id);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			const post = docSnap.data() as Post;
			await updateDoc(docRef, { likes: post.likes + 1 });
		} else {
			throw new Error("Post does not exist");
		}
	}

	async unlike(id: string): Promise<void> {
		const docRef = doc(this.collectionRef, id);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			const post = docSnap.data() as Post;
			await updateDoc(docRef, { likes: Math.max(post.likes - 1, 0) });
		} else {
			throw new Error("Post does not exist");
		}
	}

	async addComment(postId: string, commentId: string): Promise<void> {
		const docRef = doc(this.collectionRef, postId);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			const post = docSnap.data() as Post;
			await updateDoc(docRef, { comments: [...post.comments, commentId] });
		} else {
			throw new Error("Post does not exist");
		}
	}
}

export default PostService;
