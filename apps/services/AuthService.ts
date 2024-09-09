  import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
    UserCredential,
  } from "firebase/auth";

  import { User } from "../models/user";
  import { UserService } from "./UserService";
  import { auth } from "../firebaseSetup";

  export class AuthService {
    private userModel: UserService;

    constructor() {
      this.userModel = new UserService();
    }

    async registerWithEmail(
      email: string,
      password: string,
      additionalUserInfo: Partial<User> = {}
    ): Promise<UserCredential> {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const { uid } = userCredential.user;
        const user: User = {
          ...additionalUserInfo,
          id: uid,
          email,
        };
        await this.userModel.create(user);
        return userCredential;
      } catch (error: any) {
        throw new Error(`Registration failed: ${error.message}`);
      }
    }

    async signInWithEmail(
      email: string,
      password: string
    ): Promise<UserCredential> {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        return userCredential;
      } catch (error: any) {
        throw new Error(`Login failed: ${error.message}`);
      }
    }

    async sendPasswordReset(email: string): Promise<void> {
      try {
        await sendPasswordResetEmail(auth, email);
      } catch (error: any) {
        throw new Error(`Password reset failed: ${error.message}`);
      }
    }

    async signOut(): Promise<void> {
      try {
        await signOut(auth);
      } catch (error: any) {
        throw new Error(`Logout failed: ${error.message}`);
      }
    }
  }

  export const authService = new AuthService();
