import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MessagesScreen from "../screens/MessagesScreen";
import ChatMessageScreen from "../screens/ChatMessageScreen";

const Stack = createNativeStackNavigator();

function MessageChatNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Messages" component={MessagesScreen} />
      <Stack.Screen name="ChatMessages" component={ChatMessageScreen} />
    </Stack.Navigator>
  );
}

export default MessageChatNavigator;
