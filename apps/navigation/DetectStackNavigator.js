import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetectHomeScreen from "../screens/DetectHomeScreen";
import DiseaseDetectionScreen from "../screens/DiseaseDetectionScreen";

const Stack = createNativeStackNavigator();

function DetectStackNavigator() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="detectHome" component={DetectHomeScreen} />
			<Stack.Screen name="detectAnswer" component={DiseaseDetectionScreen} />
		</Stack.Navigator>
	);
}

export default DetectStackNavigator;
