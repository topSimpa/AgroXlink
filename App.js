import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import OnboardingScreen from "./apps/screens/OnboardingScreen";
import LoginScreen from "./apps/screens/LoginScreen";
import CreateAccountScreen from "./apps/screens/CreateAccountScreen";
import useCustomFonts from "./apps/config/useFonts";
import CatItem from "./apps/components/CatItem";
import ProduceDetails from "./apps/components/ProduceDetails";
import Screen from "./apps/components/Screen";
import MarketScreen from "./apps/screens/MarketScreen";
import CommunityScreen from "./apps/screens/CommunityScreen";

export default function App() {
  const fontsLoaded = useCustomFonts();

  if (!fontsLoaded) {
    return null; // You can show a loading screen here if you prefer
  }

  return <LoginScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
