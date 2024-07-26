import React from "react";

import LoginScreen from "../screens/LoginScreen";
import CreateAccountScreen from "../screens/CreateAccountScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => (
	<Stack.Navigator
		screenOptions={{
			headerShown: false,
		}}
	>
		<Stack.Screen name="Welcome" component={OnboardingScreen} />
		<Stack.Screen name="Register" component={CreateAccountScreen} />
		<Stack.Screen name="Login" component={LoginScreen} />
	</Stack.Navigator>
);

export default AuthNavigator;
