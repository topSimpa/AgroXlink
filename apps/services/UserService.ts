import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  Timestamp,
  query,
  where,
} from 'firebase/firestore';
import { User } from '../models/user';
import { db } from '../firebaseSetup';
import { uploadImage } from '../utils/uploadImage';



class UserService {
  private collectionRef;

  constructor() {
    this.collectionRef = collection(db, 'users'); // Use db directly from firebaseSetup.ts
  }

  async create(user: User): Promise<string | void> {
    if (!user.email) {
      throw new Error('Missing required fields: email and password');
    }
    const docRef = await addDoc(this.collectionRef, {
      ...user,
      dateCreated: Timestamp.fromDate(new Date()),
      dateUpdated: Timestamp.fromDate(new Date()),
    });
    return docRef.id;
  }

  async get(id: string | void): Promise<User | null> {
    if (!id) {
      throw new Error('userId is missing');
    }
    const docRef = doc(this.collectionRef, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as User;
    } else {
      return null;
    }
  }

  async update(id: string, user: Partial<User>): Promise<void> {
    const docRef = doc(this.collectionRef, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error('Invalid user ID'); // Throw an error if the document does not exist
    }
    // Check if there's a new image to upload
    let pictureUrl;
    if (user.imageUrl) {
      pictureUrl = await uploadImage(user.imageUrl, 'users', id);
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
      throw new Error('User does not exist');
    }
    await deleteDoc(docRef);
  }


}

export { UserService };
