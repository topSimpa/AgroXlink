import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import * as Yup from "yup";
import {
	ErrorMessage,
	Form,
	FormField,
	SubmitButton,
} from "./apps/components/forms";
import useCustomFonts from "./apps/config/useFonts";
import { AuthProvider } from "./apps/auth/context";
import useAuth from "./apps/auth/useAuth";
import AuthNavigator from "./apps/navigation/AuthNavigator";
import { NavigationContainer } from "@react-navigation/native";

const validationSchema = Yup.object().shape({
	email: Yup.string().required().email().label("Email"),
	password: Yup.string().required().min(4).label("Password"),
});

const RegisterForm = () => {
	const { register, login } = useAuth();

	const handleSubmit = async (userInfo) => {
		try {
			// Register the user
			const userCredential = await register(userInfo.email, userInfo.password);

			// Log the user in
			const { user } = await login(userInfo.email, userInfo.password);

			console.log("User registered and logged in:", user);
		} catch (error) {
			// Handle registration or login error
			console.error(error);
		}
	};

	return (
		<Form
			initialValues={{ email: "", password: "" }}
			onSubmit={handleSubmit}
			validationSchema={validationSchema}
		>
			<FormField
				autoCorrect={false}
				name="email"
				keyboardType="email-address"
				placeholder="Email"
				textContentType="emailAddress"
			/>
			<FormField
				autoCapitalize="none"
				autoCorrect={false}
				name="password"
				placeholder="Password"
				secureTextEntry
				textContentType="password"
			/>
			<SubmitButton title="Register" />
		</Form>
	);
};

export default function App() {
	const fontsLoaded = useCustomFonts();

	if (!fontsLoaded) {
		return null; // You can show a loading screen here if you prefer
	}

	return (
		<AuthProvider>
			<NavigationContainer>
				<AuthNavigator />
			</NavigationContainer>
		</AuthProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
