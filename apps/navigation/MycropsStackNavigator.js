import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyCropsScreen from "../screens/MyCropsScreen";
import AddCropScreen from "../screens/AddCropScreen";
import header from "../config/header";

const Stack = createNativeStackNavigator();

function MycropsStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, presentation: "transparentModal" }}
    >
      <Stack.Screen name="myCropScreen" component={MyCropsScreen} />
      <Stack.Screen name="addCrop" component={AddCropScreen} />
    </Stack.Navigator>
  );
}

export default MycropsStackNavigator;
