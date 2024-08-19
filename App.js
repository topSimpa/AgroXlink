import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import useCustomFonts from "./apps/config/useFonts";
import { AuthProvider } from "./apps/auth/context";
import { UserProvider } from "./apps/user/context";

import { auth } from "./apps/firebaseSetup";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeNavigator from "./apps/navigation/HomeNavigator";
import LoginScreen from "./apps/screens/LoginScreen";
import CreateAccountScreen from "./apps/screens/CreateAccountScreen";
import OnboardingScreen from "./apps/screens/OnboardingScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ProfileDrawerNavigator from "./apps/navigation/ProfileDrawerNavigator";

const Stack = createNativeStackNavigator();

export default function App() {
	const fontsLoaded = useCustomFonts();
	const [user, setUser] = useState(null);
	const [isReady, setIsReady] = useState(false);
	const [initialRoute, setInitialRoute] = useState("Onboarding");

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user);
			setIsReady(true);
		});
		return unsubscribe;
	}, []);

	useEffect(() => {
		const checkOnboarding = async () => {
			const onboarded = await AsyncStorage.getItem("onboarded");
			console.log("onboarded ->", onboarded);
			console.log("user ->", user);
			if (onboarded) {
				setInitialRoute(user ? "HomeNavigator" : "Login");
			} else {
				setInitialRoute("Onboarding");
			}
		};

		checkOnboarding();
	}, []);

	if (!isReady || !fontsLoaded) {
		return null; // You can show a loading screen here if you prefer
	}

	return (
		<AuthProvider>
			<UserProvider>
				<GestureHandlerRootView style={{ flex: 1 }}>
					<NavigationContainer>
						<Stack.Navigator initialRouteName={initialRoute}>
							<Stack.Screen
								name="Onboarding"
								component={OnboardingScreen}
								options={{ headerShown: false }}
							/>
							<Stack.Screen
								name="Login"
								component={LoginScreen}
								options={{ headerShown: false }}
							/>
							<Stack.Screen
								name="Register"
								component={CreateAccountScreen}
								options={{ headerShown: false }}
							/>
							<Stack.Screen
								name="profileDrawer"
								component={ProfileDrawerNavigator}
								options={{ headerShown: false }}
							/>
						</Stack.Navigator>
					</NavigationContainer>
				</GestureHandlerRootView>
			</UserProvider>
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
