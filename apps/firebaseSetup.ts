import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import {
	connectAuthEmulator,
	initializeAuth,
	getAuth,
	getReactNativePersistence,
} from "firebase/auth";
import { connectStorageEmulator, getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Ensure this is imported

const firebaseConfig = {
	apiKey: "AIzaSyBJo47N7T736IssswnYlk79X30HKSmdbCU",
	authDomain: "agrotradex-9cc4a.firebaseapp.com",
	projectId: "agrotradex-9cc4a",
	appId: "1:514649055588:android:f30a001d2b1806a6e8da71",
	storageBucket: "agrotradex-9cc4a.appspot.com",
};

console.log(process.env.REACT_APP_FIREBASE_API_KEY);

const app = initializeApp(firebaseConfig);

// when connecting to main firebase auth
// Use initializeAuth with AsyncStorage for persistence
const auth = initializeAuth(app, {
	persistence: getReactNativePersistence(AsyncStorage),
});

// const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, auth, storage };
