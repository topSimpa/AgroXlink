import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import {
	connectAuthEmulator,
	initializeAuth,
	getReactNativePersistence,
	getAuth,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connectStorageEmulator, getStorage } from "firebase/storage";
import dotenv from "dotenv";
import { devConfig } from "./firebaseConfig";

// Load environment variables from .env file
dotenv.config();

console.log("api_key -> ", process.env.REACT_APP_FIREBASE_API_KEY);

const firebaseConfig = {
	apiKey: devConfig.apiKey,
	authDomain: devConfig.authDomain,
	projectId: devConfig.projectId,
	appId: devConfig.appId,
	storageBucket: devConfig.storageBucket,
};

console.log(process.env.REACT_APP_FIREBASE_API_KEY);

const app = initializeApp(firebaseConfig);

// when connecting to main firebase auth
// Use initializeAuth with AsyncStorage for persistence
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(AsyncStorage)
// });

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// connectAuthEmulator(auth, "http://localhost:9099");
console.log("Connecting to Firestore Emulator at localhost:8080");
connectFirestoreEmulator(db, "localhost", 8080);
connectStorageEmulator(storage, "localhost", 9199);

export { db, auth, storage };
