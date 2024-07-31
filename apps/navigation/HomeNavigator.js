import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MarketScreen from "../screens/MarketScreen";
import CommunityScreen from "../screens/CommunityScreen";
import MessageScreen from "../screens/MessagesScreen";
import CropCareScreen from "../screens/CropCareScreen";
import neutral from "../config/colors/neutralColor";
import label from "../config/label";
import primary from "../config/colors/primaryColor";
import CropCare from "../assets/cropCare.svg";
import Home from "../assets/home.svg";
import Messages from "../assets/message.svg";
import People from "../assets/people.svg";
import MessageChatNavigator from "./MessageChatNavigator";

const Tab = createBottomTabNavigator();

function HomeNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: primary.p900,
        tabBarInactiveTintColor: neutral.n900,
        tabBarStyle: {
          backgroundColor: neutral.background,
          borderTopWidth: 1,
          borderColor: neutral.n100,
          elevation: 0,
          height: 70,
          paddingTop: 12,
          paddingBottom: 12,
        },
        tabBarLabelStyle: label.l4b,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={MarketScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Home width={size} height={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Crop Care"
        component={CropCareScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <CropCare width={size} height={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Community"
        component={CommunityScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <People width={size} height={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MessagesChat"
        component={MessageChatNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Messages width={size} height={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// const styles = StyleSheet.create({
//   menu: {
//     alignItems: "center",
//   },

//   mainMenu: {
//     backgroundColor:

//     bottom: 0,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 36,
//     paddingHorizontal: 32,
//     paddingTop: 12,
//     position: "absolute",
//     width: "100%",
//   },
// });
export default HomeNavigator;
