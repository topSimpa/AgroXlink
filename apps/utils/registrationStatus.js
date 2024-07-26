import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebaseSetup";

const storeRegistrationStatus = async (id, status) => {
	try {
		await setDoc(doc(db, "users", id), { isRegistered: status });
	} catch (error) {
		console.error("Error storing registration status:", error);
	}
};

const fetchRegistrationStatus = async (id) => {
	try {
		const docRef = doc(db, "users", id);
		const docSnap = await getDoc(docRef);
		return docSnap.exists() ? docSnap.data().isRegistered : false;
	} catch (error) {
		console.error("Error fetching registration status:", error);
		return false;
	}
};
