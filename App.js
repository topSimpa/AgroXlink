import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import OnboardingScreen from "./apps/screens/OnboardingScreen";
import LoginScreen from "./apps/screens/LoginScreen";
import CreateAccountScreen from "./apps/screens/CreateAccountScreen";

export default function App() {
  return <CreateAccountScreen/>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
