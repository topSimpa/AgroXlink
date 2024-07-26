import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

console.log("Firebase API Key:", process.env.REACT_APP_FIREBASE_API_KEY);
console.log(
	"Firebase Auth Domain:",
	process.env.REACT_APP_FIREBASE_AUTH_DOMAIN
);
console.log("Firebase Project ID:", process.env.REACT_APP_FIREBASE_PROJECT_ID);
console.log(
	"Firebase Storage Bucket:",
	process.env.REACT_APP_FIREBASE_STORAGE_BUCKET
);
console.log(
	"Firebase Messaging Sender ID:",
	process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
);
console.log("Firebase App ID:", process.env.REACT_APP_FIREBASE_APP_ID);
