// __mocks__/firebaseAuth.ts
import { UserCredential } from "firebase/auth";

export const mockCreateUserWithEmailAndPassword = jest.fn();
export const mockSignInWithEmailAndPassword = jest.fn();
export const mockSendPasswordResetEmail = jest.fn();
export const mockSignOut = jest.fn();

jest.mock("firebase/auth", () => ({
	createUserWithEmailAndPassword: mockCreateUserWithEmailAndPassword,
	signInWithEmailAndPassword: mockSignInWithEmailAndPassword,
	sendPasswordResetEmail: mockSendPasswordResetEmail,
	signOut: mockSignOut,
}));
