import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CareHomeScreen from "../screens/CareHomeScreen";
import DetectHomeScreen from "../screens/DetectHomeScreen";
import CustomTabBar from "../components/CustomCropCareTab"; // Adjust the path as needed
import DetectStackNavigator from "./DetectStackNavigator";
import CareStackNavigator from "./CareStackNavigator";

const Tab = createMaterialTopTabNavigator();

function CropCareNavigator() {
  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
      <Tab.Screen
        name="detect"
        component={DetectStackNavigator}
        options={{ title: "Disease Detection" }}
      />
      <Tab.Screen
        name="careHome."
        component={CareHomeScreen}
        options={{ title: "Crop Management" }}
      />
    </Tab.Navigator>
  );
}

export default CropCareNavigator;
