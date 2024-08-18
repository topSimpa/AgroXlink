import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MarketScreen from "../screens/MarketScreen";
import ProductDetailsScreen from "../screens/ProductDetailsScreen";

const Stack = createNativeStackNavigator();

function ProduceDetailsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={MarketScreen} />
      <Stack.Screen name="produceDetail" component={ProductDetailsScreen} />
    </Stack.Navigator>
  );
}

export default ProduceDetailsStack;
