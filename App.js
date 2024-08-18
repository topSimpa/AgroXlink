import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import useCustomFonts from "./apps/config/useFonts";
import { AuthProvider } from "./apps/auth/context";
import { auth } from "./apps/firebaseSetup";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeNavigator from "./apps/navigation/HomeNavigator";
import LoginScreen from "./apps/screens/LoginScreen";
import CreateAccountScreen from "./apps/screens/CreateAccountScreen";
import OnboardingScreen from "./apps/screens/OnboardingScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ProfileDrawerNavigator from "./apps/navigation/ProfileDrawerNavigator";

const Stack = createNativeStackNavigator();

export default function App() {
  const fontsLoaded = useCustomFonts();
  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [initialRoute, setInitialRoute] = useState("Onboarding");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsReady(true);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const checkOnboarding = async () => {
      const onboarded = await AsyncStorage.getItem("onboarded");
      console.log("onboarded ->", onboarded);
      console.log("user ->", user);
      if (onboarded) {
        setInitialRoute(user ? "HomeNavigator" : "Login");
      } else {
        setInitialRoute("Onboarding");
      }
    };

    checkOnboarding();
  }, []);

  if (!isReady || !fontsLoaded) {
    return null; // You can show a loading screen here if you prefer
  }

  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={initialRoute}>
            <Stack.Screen
              name="Onboarding"
              component={OnboardingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={CreateAccountScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="profileDrawer"
              component={ProfileDrawerNavigator}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

// import React, { useState, useEffect } from "react";
// import * as ImagePicker from "expo-image-picker";

// import { StyleSheet, Image, Text, TouchableOpacity } from "react-native";
// import { onAuthStateChanged } from "firebase/auth";
// import { NavigationContainer } from "@react-navigation/native";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// import useCustomFonts from "./apps/config/useFonts";
// import { AuthProvider } from "./apps/auth/context";
// import { auth } from "./apps/firebaseSetup";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import Screen from "./apps/components/Screen";
// import HomeNavigator from "./apps/navigation/HomeNavigator";
// import LoginScreen from "./apps/screens/LoginScreen";
// import CreateAccountScreen from "./apps/screens/CreateAccountScreen";
// import OnboardingScreen from "./apps/screens/OnboardingScreen";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import ProfileDrawerNavigator from "./apps/navigation/ProfileDrawerNavigator";

// export default function App() {
//   const [imageUri, setImageUri] = useState();
//   const requestPermission = async () => {
//     const { granted } = await ImagePicker.requestCameraPermissionsAsync();
//     if (!granted) alert("You need to enable permission to access the library");
//   };

//   const selectImage = async () => {
//     try {
//       const result = await ImagePicker.launchImageLibraryAsync();
//       if (!result.canceled) setImageUri(result.uri);
//     } catch (error) {}
//   };

//   useEffect(async () => {
//     requestPermission();
//   }, []);

//   return (
//     <Screen
//       style={{
//         width: "100%",
//         height: "100%",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <TouchableOpacity onPress={selectImage}>
//         <Text>select</Text>
//       </TouchableOpacity>
//       <Image source={{ uri: imageUri }} />
//     </Screen>
//   );
// }
