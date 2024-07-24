import React from "react";

import LoginScreen from "../screens/LoginScreen";
import CreateAccountScreen from "../screens/CreateAccountScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => (
	<Stack.Navigator>
		<Stack.Screen
			name="Welcome"
			component={OnboardingScreen}
			options={{ headerShown: false }}
		/>
		<Stack.Screen name="Login" component={LoginScreen} />
		<Stack.Screen
			name="Register"
			component={CreateAccountScreen}
			options={{ headerShown: false }}
		/>
	</Stack.Navigator>
);

export default AuthNavigator;
