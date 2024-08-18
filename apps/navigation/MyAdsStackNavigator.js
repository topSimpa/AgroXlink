import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyAdsScreen from "../screens/MyAdsScreen";
import AddSellScreen from "../screens/AddSellScreen";

const Stack = createNativeStackNavigator();

function MyAdsStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, presentation: "transparentModal" }}
    >
      <Stack.Screen name="myAddScreen" component={MyAdsScreen} />
      <Stack.Screen name="addSell" component={AddSellScreen} />
    </Stack.Navigator>
  );
}

export default MyAdsStackNavigator;
