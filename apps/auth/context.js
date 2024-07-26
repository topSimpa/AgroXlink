import React, { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { authService } from "../services/AuthService";
import { auth } from "../firebaseSetup";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (authUser) => {
			if (authUser) {
				setUser({ id: authUser.uid, email: authUser.email || "" });
			} else {
				setUser(null);
			}
		});

		return () => unsubscribe();
	}, []);

	const register = (email, password, additionalUserInfo = {}) => {
		return authService.registerWithEmail(email, password, additionalUserInfo);
	};

	const login = (email, password) => {
		return authService.signInWithEmail(email, password);
	};

	const logout = () => {
		return authService.signOut();
	};

	const resetPassword = (email) => {
		return authService.sendPasswordReset(email);
	};

	return (
		<AuthContext.Provider
			value={{ user, register, login, logout, resetPassword }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
