import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MenuHeader from "../components/MenuHeader";
import ProfileDrawer from "../components/ProfileDrawer";
import HomeNavigator from "./HomeNavigator";
import MycropsStackNavigator from "./MycropsStackNavigator";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import ProfileScreen from "../screens/ProfileScreen";
import EditProfileStackNavigator from "./EditProfileStackNavigator";
import MyAdsStackNavigator from "./MyAdsStackNavigator";

const Drawer = createDrawerNavigator();

function ProfileDrawerNavigator({ navigation }) {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={(navigation) => (
        <ProfileDrawer image={require("../assets/Avatar.png")} />
      )}
    >
      <Drawer.Screen name="mainScreen" component={HomeNavigator} />
      <Drawer.Screen name="mycrop" component={MycropsStackNavigator} />
      <Drawer.Screen name="myAds" component={MyAdsStackNavigator} />
      <Drawer.Screen name="forgotPassword" component={ChangePasswordScreen} />
      <Drawer.Screen name="profile" component={EditProfileStackNavigator} />
    </Drawer.Navigator>
  );
}

export default ProfileDrawerNavigator;
