import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { NavigationContainer } from "@react-navigation/native";

import useCustomFonts from "./apps/config/useFonts";
import { AuthProvider } from "./apps/auth/context";
import AuthNavigator from "./apps/navigation/AuthNavigator";
import { auth } from "./apps/firebaseSetup";
import MarketScreen from "./apps/screens/MarketScreen";

import CommunityScreen from "./apps/screens/CommunityScreen";
import HomeScreen from "./apps/screens/HomeScreen";
import LoginScreen from "./apps/screens/LoginScreen";

export default function App() {
  const fontsLoaded = useCustomFonts();
  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsReady(true);
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // // Temporary trigger to log out the user (for testing purposes)
  // useEffect(() => {
  // 	// Call the logout function here
  // 	if (user) {
  // 		handleLogout();
  // 	}
  // }, [user]);

  if (!isReady || !fontsLoaded) {
    return null; // You can show a loading screen here if you prefer
  }
  if (!isReady || !fontsLoaded) {
    return null; // You can show a loading screen here if you prefer
  }

  return (
    <AuthProvider>
      <NavigationContainer>
        {user ? <HomeScreen /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthProvider>
  );
}

// return <LoginScreen />;
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
