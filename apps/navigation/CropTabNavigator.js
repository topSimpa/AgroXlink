import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import VegetablesList from "../components/VegetablesList";
import CerealList from "../components/CerealList";
import LegumesList from "../components/LegumesList";
import FiberList from "../components/FiberList";
import label from "../config/label";
import primary from "../config/colors/primaryColor";
import neutral from "../config/colors/neutralColor";

const Tab = createMaterialTopTabNavigator();

function CropTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          ...label.l4b,
          textTransform: "capitalize",
          maxWidth: "100%",
          flex: 1,
          whiteSpace: "nowrap",
        },
        tabBarActiveTintColor: primary.p900,
        tabBarInactiveTintColor: neutral.n400,
        tabBarIndicatorStyle: {
          backgroundColor: primary.p900,
        },
        tabBarStyle: {
          backgroundColor: neutral.background,
        },
        tarBarItemStyle: {
          paddingHorizontal: 0,
        },
      }}
    >
      <Tab.Screen name="Vegetables" component={VegetablesList} />
      <Tab.Screen name="Cereals" component={CerealList} />
      <Tab.Screen name="Legumes" component={LegumesList} />
      <Tab.Screen name="Fiber" component={FiberList} />
    </Tab.Navigator>
  );
}

export default CropTabNavigator;
