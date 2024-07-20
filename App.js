import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import OnboardingScreen from "./apps/screens/OnboardingScreen";
import LoginScreen from "./apps/screens/LoginScreen";
import CreateAccountScreen from "./apps/screens/CreateAccountScreen";
import useCustomFonts from "./apps/config/useFonts";

export default function App() {
  const fontsLoaded = useCustomFonts();

  if (!fontsLoaded) {
    return null; // You can show a loading screen here if you prefer
  }

  return <CreateAccountScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
