import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MessagesScreen from "../screens/MessagesScreen";
import ChatScreen from "../screens/ChatScreen";

const Stack = createNativeStackNavigator();

function MessageChatNavigator() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="MessageChats"
				component={MessagesScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen name="ChatScreen" component={ChatScreen} />
		</Stack.Navigator>
	);
}

export default MessageChatNavigator;
