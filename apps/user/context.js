import React, { createContext, useReducer, useContext, useEffect } from "react";
import { UserService } from "../services/UserService";
import useAuth from "../auth/useAuth";

// Create User Context
const UserContext = createContext();

// Define action types
const SET_USER = "SET_USER";
const SET_LOADING = "SET_LOADING";
const SET_ERROR = "SET_ERROR";

// Reducer function
const userReducer = (state, action) => {
	switch (action.type) {
		case SET_USER:
			return {
				...state,
				userData: action.payload,
				loading: false,
				error: null,
			};
		case SET_LOADING:
			return { ...state, loading: action.payload };
		case SET_ERROR:
			return { ...state, error: action.payload, loading: false };
		default:
			return state;
	}
};

// Initial state
const initialState = {
	userData: null,
	loading: true,
	error: null,
};

// Hook to access the context
export const useUser = () => useContext(UserContext);

// UserProvider component
export const UserProvider = ({ children }) => {
	const [state, dispatch] = useReducer(userReducer, initialState);
	const { user } = useAuth();
	const userService = new UserService();

	useEffect(() => {
		const fetchUserData = async () => {
			dispatch({ type: SET_LOADING, payload: true });
			try {
				if (user) {
					console.log("Auth user:", user); // Debug log
					const data = await userService.get(user.id);
					console.log("Fetched user data:", data); // Debug log
					dispatch({ type: SET_USER, payload: data });
				} else {
					dispatch({ type: SET_USER, payload: null });
				}
			} catch (error) {
				console.error("Error fetching user data:", error); // Debug log
				dispatch({ type: SET_ERROR, payload: error });
			}
		};

		fetchUserData();
	}, [user]);

	return (
		<UserContext.Provider value={{ state, dispatch }}>
			{children}
		</UserContext.Provider>
	);
};
